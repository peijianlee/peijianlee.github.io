const o=`
/** css */
span {
  position: relative;
}
span::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #3cefff;
  transform-origin: bottom right;
  transform: scaleX(0);
  transition: transform 0.5s ease;
}

span:hover::before {
  transform-origin: bottom left;
  transform: scaleX(1);
}
`,t="",s=`
/** html */
<span>Underline</span>
`;export{o as css,s as html,t as js};
