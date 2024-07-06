import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super()
        this.setTitle("Homepage")
    }

    async getHtml() {

        return `
        <div class="geral">
            <div class="row searchContainer">

                <section class="col s6 dropDown">
                    <input id="elei" type="text" placeholder="Procurar por música.." />
                    
                    <select id="listDropa" class="listDrop browser-default transparent" style="border: 0; display: block;">
                      <option value="">Select one..</option>
                    </select>
                </section>

                <button class="col s6" id="sbtn">Search</button>
                
            </div>
            
            <div class="listSongs row">
                <!-- <article id="cardsong"></article> -->
            </div>
        </div>
        `
    }
} 