const iframeContainer = document.querySelector('#iframe-content');
const e = window.React.createElement;

class LikeButton extends React.Component {
    constructor(props) {
      super(props);
      this.state = { liked: false };
    }
  
    render() {
      if (this.state.liked) {
        return 'You liked this.';
      }
  
      return e(
        'button',
        { onClick: () => this.setState({ liked: true }) },
        'Like'
      );
    }
  }


window.ReactDOM.render(e(LikeButton))

// window.ReactDOM.render(
//     itemRendererFactory(this.itemRenderData, null),
//     this.$refs.perseusContainer,
//     () => {
//         this.loading = false;
//     }
// )
