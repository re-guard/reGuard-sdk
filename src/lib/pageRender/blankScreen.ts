import reportTracker from '../../utils/reportTracker';
function getSelector(element: Element) {
  let selector;
  if (element.id) {
    selector = `#${element.id}`;
  } else if (element.className && typeof element.className === 'string') {
    selector =
      '.' +
      element.className
        .split(' ')
        .filter(function (item: any) {
          return !!item;
        })
        .join('.');
  } else {
    selector = element.nodeName.toLowerCase();
  }
  return selector;
}

export default function blankScreen() {
  const wrapperSelectors = ['body', 'html', '#container', '.content'];
  let emptyPoints = 0;
  function isWrapper(element: any) {
    const selector = getSelector(element);
    if (wrapperSelectors.indexOf(selector) >= 0) {
      emptyPoints++;
    }
  }
  onload = function () {
    let xElements, yElements;
    for (let i = 1; i <= 9; i++) {
      xElements = document.elementsFromPoint((window.innerWidth * i) / 10, window.innerHeight / 2);
      yElements = document.elementsFromPoint(window.innerWidth / 2, (window.innerHeight * i) / 10);
      isWrapper(xElements[0]);
      isWrapper(yElements[0]);
    }
    if (emptyPoints >= 0) {
      const centerElements = document.elementsFromPoint(window.innerWidth / 2, window.innerHeight / 2);
      const reportData = {
        name: '白屏',
        type: 'blank',
        emptyPoints: '' + emptyPoints,
        screen: window.screen.width + 'x' + window.screen.height,
        viewPoint: window.innerWidth + 'x' + window.innerHeight,
        selector: getSelector(centerElements[0]),
      };
      console.log('白屏', reportData);
      reportTracker(reportData);
    }
  };
}
