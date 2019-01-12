import defBase64 from './defBase64';
import version from './version';

/**
 * 生成css样式
 *
 * @export
 * @param {number} [standTime=0]
 * @param {number} [moveTime=0]
 * @param {number} [opacity=0]
 * @returns
 */
export default function (type, moveTime, standTime, opacity) {
    let img = defBase64;

    let percent: object = {};

    let fullTime = moveTime + standTime * 2;

    percent['right'] = +(standTime / fullTime * 100).toFixed(2);
    percent['left'] = +percent['right'] + 50;

    let content = `

/*background-2233-start*/
/*background-2233.ver.${version}*/

[id="workbench.parts.editor"] .split-view-view .editor-container .overflow-guard>.monaco-scrollable-element>.monaco-editor-background{background: none;}

/* ::after 用于展示走路状态
   ::before 用于展示站立状态 */
[id="workbench.parts.editor"] .split-view-view .editor-container .monaco-editor::after,
[id="workbench.parts.editor"] .split-view-view .editor-container .monaco-editor::before {
    content: '';
    pointer-events: none;
    position: absolute;
    z-index: 99999;
    right: 0;
    bottom: 0;
    width: 180px;
    height: 260px;
    opacity: 0;
    background-image: url(${img});
    background-repeat: no-repeat;
}

[id="workbench.parts.editor"] .split-view-view:nth-child(2n) .editor-container .monaco-editor::before {
    width: 170px;
    background-position: -170px 0;
}

[id="workbench.parts.editor"] .split-view-view:nth-child(2n+1) .editor-container .monaco-editor::before {
    width: 170px;
    background-position: 0 0;
}

@keyframes move {

    0%,
    ${percent['right']}% {
        right: 0;
    }

    50%,
    ${percent['left']}% {
        right: calc(100% - 180px);
    }
}

@keyframes stand {

    0%,
    ${percent['right']}% {
        right: 0;
    }

    50%,
    ${percent['left']}% {
        right: calc(100% - 170px);
    }
}

@keyframes run22 {
    0% {
        background-position: -1805px 0;
    }

    to {
        background-position: -5px 0;
    }
}

@keyframes run33 {
    0% {
        background-position: -1980px 0;
    }

    100% {
        background-position: -180px 0;
    }
}

/* 用于转身 */
@keyframes rotate {

    0%,
    100% {
        transform: rotateY(0deg);
    }

    50% {
        transform: rotateY(180deg);
    }
}


/* 走路时透明度切换 */
@keyframes moveOpacity {

    0%,
    ${percent['right']}% {
        opacity: 0;
    }

    ${percent['right']}%,
    50% {
        opacity: ${opacity};
    }

    50%,
    ${percent['left']}% {
        opacity: 0;
    }

    ${percent['left']}%,
    100% {
        opacity: ${opacity};
    }
}


/* 站立时透明度切换 */
@keyframes standOpacity {

    0%,
    ${percent['right']}% {
        opacity: ${opacity};
    }

    ${percent['right']}%,
    50% {
        opacity: 0;
    }

    50%,
    ${percent['left']}% {
        opacity: ${opacity};
    }

    ${percent['left']}%,
    100% {
        opacity: 0;
    }
}


/* 添加动画效果 */
${type !== 'walking' ? '/*' : ''}
[id="workbench.parts.editor"] .split-view-view:nth-child(2n) .editor-container .monaco-editor::after {
    animation-name: run33, move, rotate, moveOpacity;
    animation-duration: 2s, ${fullTime}s, ${fullTime}s, ${fullTime}s, ${fullTime}s;
    animation-timing-function: steps(5), linear, steps(1), steps(1);
    animation-iteration-count: infinite;
}

[id="workbench.parts.editor"] .split-view-view:nth-child(2n+1) .editor-container .monaco-editor::after {
    animation-name: run22, move, rotate, moveOpacity;
    animation-duration: 2s, ${fullTime}s, ${fullTime}s, ${fullTime}s, ${fullTime}s;
    animation-timing-function: steps(5), linear, steps(1), steps(1);
    animation-iteration-count: infinite;
}

[id="workbench.parts.editor"] .split-view-view:nth-child(2n) .editor-container .monaco-editor::before {
    animation-name: stand, rotate, standOpacity;
    animation-duration: ${fullTime}s, ${fullTime}s, ${fullTime}s, ${fullTime}s;
    animation-timing-function: steps(1), steps(1), steps(1);
    animation-iteration-count: infinite;
}

[id="workbench.parts.editor"] .split-view-view:nth-child(2n+1) .editor-container .monaco-editor::before {
    animation-name: stand, rotate, standOpacity;
    animation-duration: ${fullTime}s, ${fullTime}s, ${fullTime}s, ${fullTime}s;
    animation-timing-function: steps(1), steps(1), steps(1);
    animation-iteration-count: infinite;
}
${type !== 'walking' ? '*/' : ''}

${type !== 'left' ? '/*' : ''}
[id="workbench.parts.editor"] .split-view-view:nth-child(2n) .editor-container .monaco-editor::before,
[id="workbench.parts.editor"] .split-view-view:nth-child(2n+1) .editor-container .monaco-editor::before {
    right: calc(100% - 170px);
    opacity: ${opacity};
    transform: rotateY(180deg);
}
${type !== 'left' ? '*/' : ''}

${type !== 'right' ? '/*' : ''}
[id="workbench.parts.editor"] .split-view-view:nth-child(2n) .editor-container .monaco-editor::before,
[id="workbench.parts.editor"] .split-view-view:nth-child(2n+1) .editor-container .monaco-editor::before {
    right: 0;
    opacity: ${opacity};
    transform: rotateY(0deg);
}
${type !== 'right' ? '*/' : ''}

/*background-2233-end*/
`;

    return content;
}
