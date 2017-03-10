const randomColor = ()  => '#'+Math.floor(Math.random()*16777215).toString(16);
const getColor = (input) => input.toLowerCase() === 'random' ? randomColor() : input;

const getBorderColors = (colors = 'random') => {
  colors = [].concat(colors) // ensure colors is an array
             .map(getColor);  // before mapping

  // hack to repeat color for a single color border and still use 'linear-gradient'
  return colors.length < 2 ? colors.concat(colors[0]) : colors;
}

module.exports.decorateConfig = (config) => {
  var configObj = Object.assign({
    animate: false,
    borderTop: '4px',
    borderRight: '4px',
    borderBottom: '4px',
    borderLeft: '4px',
    borderRadius: '4px',
    borderColors: ['#fc1da7', '#fba506'],
    borderAngle: '180deg'
  }, config.hyperBorder);

  var colors = getBorderColors(configObj.borderColors).join(',');
  var animateStyles = `
    background-size: 800% 800%;
    animation: AnimationName 16s ease infinite;
  `
  return Object.assign({}, config, {
    css: `
      html {
        height: 100%;
        background: linear-gradient(${ configObj.animate ? '269deg' : configObj.borderAngle }, ${colors});
        ${ configObj.animate ? animateStyles : '' }
        border-radius: ${configObj.borderRadius};
        overflow: hidden;
      }
      @keyframes AnimationName {
          0%{background-position:0% 50%}
          50%{background-position:100% 50%}
          100%{background-position:0% 50%}
      }
      body {
        position: absolute;
        top: ${configObj.borderTop};
        bottom: ${configObj.borderBottom};
        left: ${configObj.borderLeft};
        right: ${configObj.borderRight};
        border-radius: ${configObj.borderRadius};
      }
      ${config.css || ''}
      #mount {
      }
      .hyper_main {
        background-color: ${config.backgroundColor || '#000'};
        top: ${configObj.borderTop};
        bottom: ${configObj.borderBottom};
        left: ${configObj.borderLeft};
        right: ${configObj.borderRight};
        border-width: 0px;
      }
      .hyper_main .header_header {
        top: ${configObj.borderTop};
        left: ${configObj.borderLeft};
        right: ${configObj.borderRight};
      }
      .hyper_main .tabs_list {
        border-bottom-color: ${config.borderColor};
        border-top-left-radius: ${configObj.borderRadius};
        border-top-right-radius: ${configObj.borderRadius};
      }
      .hyper_main .tab_tab:last-child {
        border-top-right-radius: ${configObj.borderRadius}
      }
      .hyper_main .terms_terms {
        border-radius: 0 0 ${configObj.borderRadius} ${configObj.borderRadius};
        bottom: ${configObj.borderBottom};
        left: ${configObj.borderLeft};
        right: ${configObj.borderRight};
      }
      .hyper_main .terms_term {
        margin-top: ${configObj.borderTop};
      }
    `
  });
}
