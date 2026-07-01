// Preview mock screens for tools that run on your PC (so they show something on your phone).
// Representative of what each tool actually does. Keyed by card id.
window.MOCKUPS = {
  frameworth: `
    <div class="mk-screen">
      <div class="mk-bar"><span class="mk-dot"></span><span class="mk-dot"></span><span class="mk-dot"></span><span class="mk-app">FrameWorth</span></div>
      <div class="mk-pad">
        <p class="mk-kick">Ranked stills pulled from your video</p>
        <div class="mk-strip">
          <div class="mk-frame best"><span class="mk-score">96</span></div>
          <div class="mk-frame"><span class="mk-score">88</span></div>
          <div class="mk-frame"><span class="mk-score">81</span></div>
          <div class="mk-frame"><span class="mk-score">74</span></div>
          <div class="mk-frame"><span class="mk-score">69</span></div>
        </div>
        <div class="mk-row-line"><span>Best still</span><span class="mk-tag2">sharp · well-lit · subject centered</span></div>
        <button class="mk-btn">Export top 5 stills</button>
      </div>
    </div>`,
  "brand-it-up": `
    <div class="mk-screen">
      <div class="mk-bar"><span class="mk-dot"></span><span class="mk-dot"></span><span class="mk-dot"></span><span class="mk-app">Brand It Up</span></div>
      <div class="mk-split">
        <div class="mk-half">
          <p class="mk-kick">Paste your content</p>
          <div class="mk-inputbox">Three things every contractor should automate this year…</div>
          <div class="mk-chips"><span class="mk-chip on">Takeaway</span><span class="mk-chip">Guide</span><span class="mk-chip">One-Pager</span></div>
          <button class="mk-btn">Brand It Up</button>
        </div>
        <div class="mk-half">
          <p class="mk-kick">On-brand PDF</p>
          <div class="mk-pdf">
            <span class="mk-pdf-kick">THE TAKEAWAY</span>
            <span class="mk-pdf-h">3 Things To Automate</span>
            <span class="mk-pdf-line"></span><span class="mk-pdf-line short"></span><span class="mk-pdf-line"></span>
          </div>
        </div>
      </div>
    </div>`,
  "voice-studio": `
    <div class="mk-screen">
      <div class="mk-bar"><span class="mk-dot"></span><span class="mk-dot"></span><span class="mk-dot"></span><span class="mk-app">Pathworth Voice Studio</span></div>
      <div class="mk-pad">
        <div class="mk-row-line"><span>Your cloned voice</span><span class="mk-tag2 ok">ready ✓</span></div>
        <div class="mk-wave">${Array.from({length:34}).map((_,i)=>`<span style="height:${20+Math.round(60*Math.abs(Math.sin(i*0.9)))}%"></span>`).join("")}</div>
        <p class="mk-kick">Type what I should say</p>
        <div class="mk-inputbox">Hey, it's Jermaine. Let me show you what this can do.</div>
        <button class="mk-btn">Generate in my voice</button>
      </div>
    </div>`,
  "video-grabber": `
    <div class="mk-screen">
      <div class="mk-bar"><span class="mk-dot"></span><span class="mk-dot"></span><span class="mk-dot"></span><span class="mk-app">Video Grabber</span></div>
      <div class="mk-pad">
        <p class="mk-kick">Protected replay URL</p>
        <div class="mk-inputbox mono">https://…voomly.com/replay/•••••••</div>
        <div class="mk-row-line"><span>Capturing stream</span><span class="mk-tag2">68%</span></div>
        <div class="mk-prog"><div class="mk-progfill" style="width:68%"></div></div>
        <button class="mk-btn">Save as clean MP4</button>
      </div>
    </div>`,
  "photo-organizer": `
    <div class="mk-screen">
      <div class="mk-bar"><span class="mk-dot"></span><span class="mk-dot"></span><span class="mk-dot"></span><span class="mk-app">Photo Organizer</span></div>
      <div class="mk-pad">
        <div class="mk-row-line"><span>158,432 files</span><span class="mk-tag2 ok">sorted · 0 misfiled</span></div>
        <div class="mk-folder"><span>Photos</span><span class="mk-count">92,140</span></div>
        <div class="mk-folder"><span>Screenshots</span><span class="mk-count">18,020</span></div>
        <div class="mk-folder"><span>Receipts &amp; Docs</span><span class="mk-count">11,316</span></div>
        <div class="mk-folder"><span>Videos</span><span class="mk-count">6,904</span></div>
        <button class="mk-btn">Review before moving</button>
      </div>
    </div>`,
};
