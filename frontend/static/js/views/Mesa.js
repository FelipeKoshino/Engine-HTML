import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super()
        this.setTitle("Mesa")
    }

    async getHtml() {
        return `
        <div class="ptitle">
        <h1>Mesa Page</h1>
        <p>Em contrução</p>
        </div>
        `
    }
} 