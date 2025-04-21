const r=`
.arrow-group {
    --h: 30px;
    --size: 12px;
    --gap: 3px;
    display: flex;
    padding-left: var(--size);
}
.arrow {
    height: var(--h);
    line-height: var(--h);
    text-align: center;
    color: chocolate;
    background-color: burlywood;
    clip-path: polygon(
        0 0,
        calc(100% - var(--size)) 0,
        100% 50%,
        calc(100% - var(--size)) 100%,
        0 100%,
        var(--size) 50%
    );
    margin-left: calc((var(--size) - var(--gap)) * -1);
    padding-left: calc(var(--size) * 1.8);
    padding-right: calc(var(--size) * 1.8);
    cursor: pointer;
    transition: background-color, color .3s;
}
.arrow:hover {
    color: white;
    background-color: cornflowerblue;
}
`,a="",o=`
<ul class="arrow-group">
    <li class="arrow">Step-1</li>
    <li class="arrow">Step-2</li>
    <li class="arrow">Step-3</li>
    <li class="arrow">Step-4</li>
</ul>
`;export{r as css,o as html,a as js};
