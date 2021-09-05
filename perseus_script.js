
const sorterWidgetRegex = /sorter [0-9]+/;
const itemRendererFactory = window.React.createFactory(window.Perseus.ItemRenderer);

const vueApp = new Vue({
  el: '#framework-perseus',
  name: 'PerseusRendererIndex',
  components: {
  },
  mixins: [],
  data: () => ({
    loading: true,      
    message: null,      
    item: {},
    itemRenderer: null,
    scratchpad: false,      
    blankState: null,
    allowHints: true,
    interactive: true,
    nextQuestionToggle: false,
    maxQuestionIndex: 0,
    questionIndex: 0,
    perseusData: null,
    messageType: 'blank',
    exerciseComplete: false,
    message_strings: {
      showScratch: 'Show scratchpad',
      notAvailable: 'The scratchpad is not available',
      loading: 'Loading',
      hint: 'Use a hint ({hintsLeft, number} left)',
      hintExplanation: 'If you use a hint, this question will not be added to your progress',
      hintLabel: 'Hint:',
      noMoreHint: 'No more hints',
      exerciseComplete: 'Exercise Complete!',
      correntAns: 'Correct!',
      incorrectAns: 'Incorrect, try again or use a hint!',
      incompleteAns: 'We could not understand your answer. Please check your answer for complete answer without extra text or symbols.'
    },
  }),
  computed: {
    isMobile() {
      return false;
    },
    
    usesTouch() {
      const isMobileBrowser = new RegExp(/Mobi*|Android/);
      return isMobileBrowser.test(window.navigator.userAgent);
    },
    itemRenderData() {
      return {
        initialHintsVisible: 0,
        item: this.item,
        workAreaSelector: '#workarea',
        problemAreaSelector: '#problem-area',
        problemNum: Math.floor(Math.random() * 1000),
        enabledFeatures: {
          highlight: true,
          toolTipFormats: true,
        },
        apiOptions: {
          interactionCallback: this.interactionCallback,
          onFocusChange: this.dismissMessage,
          isMobile: this.isMobile,
          customKeypad: this.usesTouch,
          readOnly: !this.interactive,
          // readOnly: false,
        },
      };
    },
    hinted() {
      return this.itemRenderer ? this.itemRenderer.state.hintsVisible > 0 : false;
    },
    availableHints() {
      return this.itemRenderer
        ? this.itemRenderer.getNumHints() - this.itemRenderer.state.hintsVisible
        : 0;
    },
    anyHints() {
      return this.allowHints && (this.itemRenderer ? this.itemRenderer.getNumHints() : 0);
    },
  },
  watch: {
    itemId: 'loadItemData',
    itemData: 'setItemData',
    loading: 'setAnswer',
    answerState: 'resetState',
    showCorrectAnswer: 'resetState',
  },
  beforeCreate() {
    // maybe add icu script here
  },

  beforeDestroy() {
    this.clearItemRenderer();
    this.$emit('stopTracking');
  },

  created() {
    this.perseusData = window.$('#my-data').data('dump');
    this.maxQuestionIndex = window.$('#my-data').data('total');

    const initPromise = window.Perseus.init({ skipMathJax: false, loadExtraWidgets: true })
    // Try to load the appropriate directional CSS for the particular content
    Promise.all([initPromise]).then(() => {
      this.setPerseusData(this.questionIndex);
      this.$emit('startTracking');
    });
    
  },
  mounted() {
    this.$emit('mounted');
  },
  methods: {
    contentDirection() {
      return 'ltr'
    },

    setPerseusData(index) {
      function getItemForIndex(data, i) {
        return data[i]
      }

      if(index < this.maxQuestionIndex)
        this.setItemData(getItemForIndex(this.perseusData, index));
      else {
        this.exerciseComplete = true;
        this.messageType = 'truth';
        this.message = this.message_strings.exerciseComplete;
      }
    },

    validateItemData(obj) {
      return (
        [
          'calculator',
          'chi2Table',
          'periodicTable',
          'tTable',
          'zTable',
        ].reduce(            
          (prev, key) =>
            !(
              !prev ||
              (Object.prototype.hasOwnProperty.call(obj.answerArea, key) &&
                typeof obj.answerArea[key] !== 'boolean')
            ),
          true
        ) &&
        Array.isArray(obj.hints) &&
        obj.hints.reduce(
          (prev, item) => item && typeof item === 'object',
          true
        ) &&
        obj.question &&
        typeof obj.question === 'object'
      );
    },

    renderItem() {
      this.loading = true;
      this.blankState = null;

      this.$set(
        this,
        'itemRenderer',
        window.ReactDOM.render(
          itemRendererFactory(this.itemRenderData, null),
          this.$refs.perseusContainer,
          () => {
            this.loading = false;
          }
        )
      );
    },

    resetState(val) {
      console.log('reset state logged');
      if (!val) {
        this.restoreSerializedState(this.blankState);
      }
      this.setAnswer();
    },

    clearItemRenderer() {
      try {
        reactDOM.unmountComponentAtNode(this.$refs.perseusContainer);
        this.$set(this, 'itemRenderer', null);
      } catch (e) {
        logging.debug('Error during unmounting of item renderer', e);
      }
    },

    addSorterState(questionState) {
      this.itemRenderer.getWidgetIds().forEach(id => {
        if (sorterWidgetRegex.test(id)) {
          if (questionState[id]) {
            const sortableComponent = this.itemRenderer.questionRenderer.getWidgetInstance(id)
              .refs.sortable;
            questionState[id].options = sortableComponent.getOptions();
          }
        }
      });
      return questionState;
    },

    getSerializedState() {
      const hints = Object.keys(this.itemRenderer.hintsRenderer.refs).map(key =>
        this.itemRenderer.hintsRenderer.refs[key].getSerializedState()
      );
      const question = this.addSorterState(
        this.itemRenderer.questionRenderer.getSerializedState()
      );
      return {
        question,
        hints,
      };
    },

    restoreSerializedState(answerState) {
      this.itemRenderer.restoreSerializedState(answerState);
      this.itemRenderer.getWidgetIds().forEach(id => {
        if (sorterWidgetRegex.test(id)) {
          if (answerState.question[id]) {
            const sortableComponent = this.itemRenderer.questionRenderer.getWidgetInstance(id)
              .refs.sortable;
            const newProps = Object.assign({}, sortableComponent.props, {
              options: answerState.question[id].options,
            });
            sortableComponent.setState({ items: sortableComponent.itemsFromProps(newProps) });
          }
        }
      });
    },

    setAnswer() {
      this.blankState = this.getSerializedState();
      if (
        this.itemRenderer &&
        this.answerState &&
        this.answerState.question &&
        this.answerState.hints &&
        !this.loading
      ) {
        this.restoreSerializedState(this.answerState);
      } else if (this.showCorrectAnswer && !this.loading) {
        this.setCorrectAnswer();
      } else if (this.itemRenderer && !this.loading) {
        
        this.itemRenderer.setState({
          hintsVisible: 0,
        });
      }
    },

    checkAnswer() {
      var result = null;
      if (this.itemRenderer && !this.loading) {
        const check = this.itemRenderer.scoreInput();
        this.empty = check.empty;
        if (check.message && check.empty) {
          this.message = check.message;
        } else if (!check.empty) {
          const answerState = this.getSerializedState();
          
          const simpleAnswer = '';
          result = {
            correct: check.correct,
            answerState,
            simpleAnswer,
          };
        }
      }
      this.postCheck(result);
      return null;
    },

    postCheck(result) {
      if(result && result.correct) {
        this.messageType = 'truth';
        this.message = this.message_strings.correntAns;
        this.checkBtnLabel = 'Next Question';
        this.nextQuestionToggle = true;
      }
      else if(result && !result.correct) {
        this.messageType = 'error';
        this.message = this.message_strings.incorrectAns;
        setTimeout(this.dismissMessage, 5000);
      }
      else {
        this.messageType = 'error';
        this.message = this.message_strings.incompleteAns;
        setTimeout(this.dismissMessage, 5000);
      }
    },

    nextQuestion() {
      this.questionIndex += 1;
      this.messageType = 'blank';
      this.nextQuestionToggle = false;
      this.itemRenderer.setState({
        hintsVisible: 0,
      });
      this.setPerseusData(this.questionIndex);
    },

    takeHint() {
      if (
        this.itemRenderer &&
        this.itemRenderer.state.hintsVisible < this.itemRenderer.getNumHints()
      ) {
        this.itemRenderer.showHint();
        // this.$parent is undefined because it may be used in kolibri parents somewhere so this.$emit might work
        // so the line below does not do anything to perseus render as far as i consider
        // this.$parent.$emit('hintTaken', { answerState: this.getSerializedState() });
        this.$emit('hintTaken', { answerState: this.getSerializedState() });
      }
    },

    interactionCallback() {
      this.$emit('interaction');
      this.dismissMessage();
    },

    dismissMessage() {
      this.message = null;
      this.messageType = 'blank';
    },
    
    loadItemData() {
      
    },

    setItemData(itemData) {
      this.item = itemData;
      if (this.validateItemData(itemData)) {
        if (this.$el) {
          this.renderItem();
        } else {
          this.$once('mounted', this.renderItem);
        }
      } else {
        logging.warn('Loaded item was malformed', itemData);
      }
    },

    setCorrectAnswer() {
      console.log('setting correct answer');
      const questionRenderer = this.itemRenderer.questionRenderer;
      const widgetProps = questionRenderer.state.widgetInfo;

      const gradedWidgetIds = questionRenderer.widgetIds.filter(id => {
        return widgetProps[id].graded == null || widgetProps[id].graded;
      });
      try {
        gradedWidgetIds.forEach(id => {
          const props = widgetProps[id];
          const widget = questionRenderer.getWidgetInstance(id);
          if (!widget) {
            
            return;
          }
          window.WidgetSolver(widget, props.type, props.options);
        });
      } catch (e) {
        this.$emit('answerUnavailable');
      }
    },
  }
})
