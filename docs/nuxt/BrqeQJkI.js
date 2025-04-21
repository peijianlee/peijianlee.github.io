const i=`
/** css */
.inline-clice {
    --size: 30px;
    --bg-color: #cc0000;
    --second: 1.5s;
    width: var(--size);
    height: var(--size);
    display: inline-block;
    position: relative;
}
.inline-clice,
.inline-clice::before,
.inline-clice::after {
    background-color: var(--bg-color);
    border-radius: 50%;
}
.inline-clice::before,
.inline-clice::after {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.5;
    animation: scaleAnimate var(--second) infinite;
}
.inline-clice::before {
    animation-delay: calc(var(--second) / 2);
}
@keyframes scaleAnimate {
    0% {
        transform: scale(1);
    }
    100% {
        opacity: 0;
        transform: scale(2.5);
    }
}
`,e="",n=`
/** html */
<span class="inline-clice"></span>
`;export{i as css,n as html,e as js};
