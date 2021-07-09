
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

      message_strings: {
        showScratch: 'Show scratchpad',
        notAvailable: 'The scratchpad is not available',
        loading: 'Loading',
        hint: 'Use a hint ({hintsLeft, number} left)',
        hintExplanation: 'If you use a hint, this question will not be added to your progress',
        hintLabel: 'Hint:',
        noMoreHint: 'No more hints',
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
      
    },

    beforeDestroy() {
      this.clearItemRenderer();
      this.$emit('stopTracking');
    },

    created() {
      this.setPerseusData();
      
      
      
      
      
      
      
      
      
      
      
      
      
    },
    mounted() {
      this.$emit('mounted');
    },
    methods: {
      contentDirection() {
        return 'ltr'
      },

      setPerseusData() {
        function getJSON() {
          perseusData = { "answerArea": { "calculator": false, "chi2Table": false, "periodicTable": false, "tTable": false, "zTable": false }, "hints": [{ "content": "When we skip count by tens,  we add $10$ to each number as we count.", "images": {}, "replace": false, "widgets": {} }, { "content": "Since our first number is missing, we need to **subtract** $10$ from $790$.\n\n${790} - 10 = \\blueE{780}$", "images": {}, "replace": false, "widgets": {} }, { "content": "Now, let\u0027s add $10$ to complete the list. \n\n$\\blueE{780} \\underset{ + 10}{\\rightarrow} {790} \\underset{ + 10}{\\rightarrow}\\purpleD{800}  \\underset{ + 10}{\\rightarrow} {810}\\underset{ + 10}{\\rightarrow}  \\maroonD{820} \\underset{ + 10}{\\rightarrow} \\goldE{830}$", "images": {}, "replace": false, "widgets": {} }, { "content": "Here is the completed set of numbers:\n\n$\\blueE{780},790,\\purpleD{800} , {810} , \\maroonD{820}, \\goldE{830} $", "images": {}, "replace": false, "widgets": {} }], "itemDataVersion": { "major": 0, "minor": 1 }, "question": { "content": "**Fill in the blanks by counting by $10$s. **\n\n | | | | |\n- | - | - | - | - \n[[\u2603 numeric-input 1]] | $790$ | [[\u2603 numeric-input 2]] | $810$  |[[\u2603 numeric-input 3]] | [[\u2603 numeric-input 4]]", "images": {}, "widgets": { "numeric-input 1": { "alignment": "default", "graded": true, "options": { "answers": [{ "maxError": null, "message": "", "simplify": "required", "status": "correct", "strict": false, "value": 780 }], "coefficient": false, "labelText": "", "multipleNumberInput": false, "rightAlign": false, "size": "normal", "static": false }, "static": false, "type": "numeric-input", "version": { "major": 0, "minor": 0 } }, "numeric-input 2": { "alignment": "default", "graded": true, "options": { "answers": [{ "maxError": null, "message": "", "simplify": "required", "status": "correct", "strict": false, "value": 800 }], "coefficient": false, "labelText": "", "multipleNumberInput": false, "rightAlign": false, "size": "normal", "static": false }, "static": false, "type": "numeric-input", "version": { "major": 0, "minor": 0 } }, "numeric-input 3": { "alignment": "default", "graded": true, "options": { "answers": [{ "maxError": null, "message": "", "simplify": "required", "status": "correct", "strict": false, "value": 820 }], "coefficient": false, "labelText": "", "multipleNumberInput": false, "rightAlign": false, "size": "normal", "static": false }, "static": false, "type": "numeric-input", "version": { "major": 0, "minor": 0 } }, "numeric-input 4": { "alignment": "default", "graded": true, "options": { "answers": [{ "maxError": null, "message": "", "simplify": "required", "status": "correct", "strict": false, "value": 830 }], "coefficient": false, "labelText": "", "multipleNumberInput": false, "rightAlign": false, "size": "normal", "static": false }, "static": false, "type": "numeric-input", "version": { "major": 0, "minor": 0 } } } } }
          return perseusData
        }

        this.setItemData(getJSON());

        
        
        

        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
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
            /* eslint-disable no-mixed-operators */
            
            
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
        /* eslint-enable no-mixed-operators */
      },
      renderItem() {
        
        this.loading = true;
        
        this.blankState = null;

        console.log(this.$refs.perseusContainer);

        
        
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
      /*
      * Special method to extract the current state of a Perseus Sorter widget
      * as it does not currently properly support getSerializedState
      */
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
        if (this.itemRenderer && !this.loading) {
          const check = this.itemRenderer.scoreInput();
          this.empty = check.empty;
          if (check.message && check.empty) {
            this.message = check.message;
          } else if (!check.empty) {
            const answerState = this.getSerializedState();
            
            const simpleAnswer = '';
            return {
              correct: check.correct,
              answerState,
              simpleAnswer,
            };
          }
        }
        return null;
      },
      takeHint() {
        if (
          this.itemRenderer &&
          this.itemRenderer.state.hintsVisible < this.itemRenderer.getNumHints()
        ) {
          this.itemRenderer.showHint();
          this.$parent.$emit('hintTaken', { answerState: this.getSerializedState() });
        }
      },
      interactionCallback() {
        this.$emit('interaction');
        this.dismissMessage();
      },
      dismissMessage() {
        
        this.message = null;
      },
      loadItemData() {
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
      },
      setItemData(itemData) {
        this.item = itemData;
        if (this.validateItemData(itemData)) {
          if (this.$el) {
            console.log('rendering');
            
            this.renderItem();
          } else {
            console.log('listening');
            this.$once('mounted', this.renderItem);
          }
        } else {
          logging.warn('Loaded item was malformed', itemData);
        }
      },
      setCorrectAnswer() {
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
            widgetSolver(widget, props.type, props.options);
          });
        } catch (e) {
          this.$emit('answerUnavailable');
        }
      },
    }
  })

  
  
  
  
  
  
  
  
  
  
  
  

  
    
    
    
    

    
    
    

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

  
  
  
  
  
  
  
  

