import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super()
        this.setTitle("Lyrics")
    }
    async getHtml() {
        
        return `
        <div class="ptitle">
        <h1>Lyrics Page</h1>
        <p>Encontre aqui suas músicas salvas</p>
        </div>
        `
    }
} 