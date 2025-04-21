const n=`
/** css */
.bg-lines {
  width: 50%;
  height: 50%;
  --tw-bg-opacity: 1;
  --bg-size: 36px;
  --line-color: rgba(255,255,255,0.3);
  background-color: gray;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  background-image: linear-gradient(
    45deg,
    var(--line-color) 25%,
    transparent 25%,
    transparent 50%,
    var(--line-color) 50%,
    var(--line-color) 75%,
    transparent 75%,
    transparent
  );
  background-size: var(--bg-size) var(--bg-size);
  transition: .3s;
}
.bg-lines:hover {
  background-color: orange;
  animation: bgAnimate .5s linear infinite;
}
@keyframes bgAnimate {
  to {
    background-position-x: calc(var(--bg-size) * -1);
  }
}
`,a="",i=`
/** html */
<span class="bg-lines"></span>
`;export{n as css,i as html,a as js};
