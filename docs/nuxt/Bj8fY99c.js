const t=`
/** xxxsssss */
.ip-title__num::before {
    content: attr(data-num);
    color: white;
    font-size: 42px;
    font-style: italic;
    font-weight: bold;
    position: absolute;
    left: calc(50% - 10px);
    top: calc(50% - 25px);
}
.ip-title__num::after {
    content: '';
    box-sizing: border-box;
    position: absolute;
    top: 12px;
    left: 12px;
    height: var(--size);
    width: var(--size);
    transform: rotate(45deg);
    border: 3px solid var(--border-color);
}
`,o=`
/** javascript */
for (let i = 100; i < 0; i++) {
    console.log(i)
}
`,i=`
/** html */
<body>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
</body>
`;export{t as css,i as html,o as js};
