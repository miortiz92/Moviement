class autoPause {
  constructor() {
    this.threshold = 0.25;
  }

  run(player) {
    const observer = new IntersectionObserver(this.handleIntersection, {
      threshold: this.threshold,
    });
    observer.observe(player.media);
  }

  handleIntersection(entries) {
    const entry = entries[0];
    const isVisible = entry.intersectionRatio >= this.threshold;

    if(isVisible) {
      this.player.play();
    } else {
      this.player.pause();
    }
    console.log(entry);
  };

}

export default autoPause;
