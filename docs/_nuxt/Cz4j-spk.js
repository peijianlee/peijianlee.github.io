const e=`
.checked-line__container {
  cursor: pointer;
}

.checked-line__container input {
  display: none;
}

.checked-line__container svg {
  overflow: visible;
}

.path {
  fill: none;
  stroke: #2b74ea;
  stroke-width: 8;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: stroke-dasharray 0.5s ease, stroke-dashoffset 0.5s ease;
  stroke-dasharray: 241 9999999;
  stroke-dashoffset: 0;
}

.checked-line__container input:checked ~ svg .path {
  stroke-dasharray: 70.5096664428711 9999999;
  stroke-dashoffset: -262.2723388671875;
}
`,s="",t=`
<label class="checked-line__container">
  <input type="checkbox">
    <svg viewBox="0 0 64 64" height="2em" width="2em">
      <path d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16" pathLength="575.0541381835938" class="path"></path>
    </svg>
</label>
`;export{e as css,t as html,s as js};
