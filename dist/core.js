/**
 * 提供濾波器生成及核心物件`AudioContext`
 */
export class AudioContextWithMethod {
    constructor(contextOptions) {
        this.audioCtx = new AudioContext(contextOptions);
    }
    /**
     * 生成濾波器
     *
     * 濾波器預設屬性
     * type: `lowpass`
     * f: `350hz`
     * q: `1`
     * gain: `0`
     *
     * @returns 濾波器
     */
    createBiquadFilter() {
        return this.audioCtx.createBiquadFilter();
    }
    /**
     * 標準的二階全通濾波器。它讓所有頻率通過，但改變各種頻率之間的相位關係。
     *
     * 具有最大群延遲的頻率，即相位轉換中心的頻率。
     *
     * Q: 控制在中間頻率處轉換的銳度。此參數越大，轉換越銳利，並且越大。
     *
     * Gain: 無效
     *
     * @param f 頻率
     * @param q 範圍
     */
    allpass({ f, g, q }) {
        const filter = this.createBiquadFilter();
        filter.type = "allpass";
        filter.frequency.value = f;
        filter.Q.value = q;
        return filter;
    }
    /**
     * 標準的二階帶通濾波器。頻率範圍外的頻率被衰減；其內的頻率通過。
     *
     * 頻率範圍的中心
     *
     * Q: 控制頻率帶的寬度。Q 值越大，頻率帶越寬。
     *
     * Gain: 無效
     * @param f 頻率
     * @param q 範圍
     */
    bandpass({ f, g, q }) {
        const filter = this.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.value = f;
        filter.Q.value = q;
        return filter;
    }
    /**
     * 標準的二階諧振高通濾波器，每個八度下降12dB。低於截止頻率的頻率被衰減；高於截止頻率的頻率通過。
     *
     * 截止頻率
     *
     * Q: 表示在截止頻率周圍頻率有多尖銳。值越大，尖峰越大。
     *
     * Gain: 無效
     *
     * @param f 頻率
     * @param q 範圍
     */
    highpass({ f, g, q }) {
        const filter = this.createBiquadFilter();
        filter.type = "highpass";
        filter.frequency.value = f;
        filter.Q.value = q;
        return filter;
    }
    /**
     * 標準的二階高櫃濾波器。高於指定頻率的頻率被放大或衰減；低於它的頻率不變。
     *
     * 頻率的下限
     *
     * Q: 無效
     *
     * Gain: 將要應用的增益（以 dB 為單位）。如果為負值，則是一種衰減。
     * @param f 頻率
     * @param g 增益
     */
    highshelf({ f, g, q }) {
        const filter = this.createBiquadFilter();
        filter.type = "highshelf";
        filter.frequency.value = f;
        filter.gain.value = g;
        return filter;
    }
    /**
     * 標準的二階諧振低通濾波器，每個八度下降12dB。低於截止頻率的頻率通過；高於截止頻率的頻率被衰減。
     *
     * 截止頻率
     *
     * Q: 表示在截止頻率周圍頻率有多尖銳。值越大，尖峰越大。
     *
     * Gain: 無效
     *
     * @param f 頻率
     * @param q 範圍
     */
    lowpass({ f, g, q }) {
        const filter = this.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.value = f;
        filter.Q.value = q;
        return filter;
    }
    /**
     * 標準的二階低櫃濾波器。低於指定頻率的頻率被放大或衰減；高於它的頻率不變。
     *
     * 頻率的上限
     *
     * Q: 無效
     *
     * Gain: 將要應用的增益（以 dB 為單位）。如果為負值，則是一種衰減。
     * @param f 頻率
     * @param g 增益
     */
    lowshelf({ f, g, q }) {
        const filter = this.createBiquadFilter();
        filter.type = "lowshelf";
        filter.frequency.value = f;
        filter.gain.value = g;
        return filter;
    }
    /**
     * 標準的陷波濾波器，也稱為帶阻濾波器或帶拒濾波器。與帶通濾波器相反：頻率範圍外的頻率通過；其內的頻率被衰減。
     *
     * 頻率範圍的中心
     *
     * Q: 控制頻率帶的寬度。Q 值越大，頻率帶越寬。
     *
     * Gain: 無效
     *
     * @param f 頻率
     * @param q 範圍
     */
    notch({ f, g, q }) {
        const filter = this.createBiquadFilter();
        filter.type = "notch";
        filter.frequency.value = f;
        filter.Q.value = q;
        return filter;
    }
    /**
     * 頻率範圍內的頻率被放大或衰減；其外的頻率不變。
     *
     * 頻率範圍的中間
     *
     * Q: 控制頻率帶的寬度。Q 值越大，頻率帶越寬。
     *
     * Gain: 將要應用的增益（以 dB 為單位）。如果為負值，則是一種衰減。
     *
     * @param f 頻率
     * @param q 範圍
     * @param g 增益
     */
    peaking({ f, g, q }) {
        const filter = this.createBiquadFilter();
        filter.type = "peaking";
        filter.frequency.value = f;
        filter.Q.value = q;
        filter.gain.value = g;
        return filter;
    }
}
/**
 * 等化器，擴充音源或影片
 *
 * @example
 * ```
 * // basic
 * const video = document.createElement("video")
 * const core = new AudioContextWithMethod();
 * const equalizer = new Equalizer(video, core.audioCtx);
 * equalizer.addToQueue(core.peaking(32, 0.7, 1))
 * equalizer
 * .addToQueue(core.peaking(64, 0.7, 1), "example")
 * .addToQueue(core.peaking(128, 0.7, 1), "example2")
 *
 * // 自定義濾波器
 * const filter = core.createBiquadFilter()
 * filter.type = "peaking"
 * equalizer.addToQueue(filter, "example");
 * equalizer.queue.get('example')[0].Q.value = 0.7
 *
 * // 添加完濾波器
 * video.pause()
 * equalizer.stream()
 * video.play()
 * ```
 */
export class Equalizer {
    constructor(el, audioCtx) {
        this.audioCtx = audioCtx;
        this.media = el;
        this.queue = new Map();
        this.index = 1;
    }
    /**
     * 添加至佇列
     * @param filter 濾波器
     * @param id 命名
     *
     * @returns Equalizer
     */
    addToQueue(filter, id) {
        const indexstr = this.index.toString();
        this.queue.set(typeof id === "string" ? id : indexstr, [filter, indexstr]);
        this.index++;
        return this;
    }
    /**
     * 串接佇列上的濾波器，推薦串流前先暫停，結束後再播放。
     */
    stream() {
        this.source = this.audioCtx.createMediaElementSource(this.media);
        let last = this.source;
        this.queue.forEach(([filter]) => {
            last.connect(filter);
            last = filter;
        });
        last.connect(this.audioCtx.destination);
    }
}
