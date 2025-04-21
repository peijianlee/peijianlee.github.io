const t=`
/** css */
.btn-slide {
  z-index: 1;
  position: relative;
  font-size: inherit;
  font-family: inherit;
  color: white;
  padding: 0.5em 1em;
  outline: none;
  border: none;
  background-color: hsl(236, 32%, 26%);
  cursor: pointer;
}

.btn-slide::before {
  content: '';
  z-index: -1;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fc2f70;
  transform-origin: center right;
  transform: scaleX(0);
  transition: transform 0.25s ease-in-out;
}

.btn-slide:hover::before {
  transform-origin: center left;
  transform: scaleX(1);
}
`,o="",n=`
/** html */
<button class="btn-slide">button slide</button>
`;export{t as css,n as html,o as js};
