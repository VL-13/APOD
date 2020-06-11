function Apod(id){
    this.id = id;
    this.date = undefined;
    let body = document.body;
    this.container = document.createElement('div');
    this.container.setAttribute('id', this.id);
    this.dateFormatter = function () {
        var now = this.date;
        var y = now.getFullYear();
        var m = now.getMonth() + 1;
        var d = now.getDate();
        var mm = m < 10 ? '0' + m : m;
        var dd = d < 10 ? '0' + d : d;
        return '' + y + '-' + mm + '-' + dd;
    }
    this.renderApp = function (data) {
        let title = document.createElement('h1');
        title.innerText = data.title;
        if (data.title === undefined) {
            title.innerText = "⚠ \n Oops! Something went wrong.\n ";
        }
    
        let imageDiv = document.createElement('div');
        imageDiv.classList.add('image');
    
        if(data.media_type === 'video') {
            let iframe = document.createElement('iframe');
            iframe.setAttribute('src', data.url);
            iframe.setAttribute('width', '360');
            iframe.setAttribute('height', '240');
            imageDiv.append(iframe);
        } else if (data.media_type === 'image') {
            let image = document.createElement('img');
            image.setAttribute('src', data.url);
            imageDiv.append(image);
        } else {
            let x = document.createElement('p');
            x.innerText = " ";
            imageDiv.append(x);
        }
        
        let paragraph = document.createElement('p');
        paragraph.innerText = data.explanation;
        if (data.explanation === undefined) {
            paragraph.innerText = "This content didn't load correctly. Please click 'Load new APOD' to see previous APOD or come back later! \n ";
        }

        let line = document.createElement('hr');

        this.container.append(title);
        this.container.append(imageDiv);
        this.container.append(paragraph);
        
    
        if(data.copyright) {
            let copyrightDiv = document.createElement('div');
            copyrightDiv.classList.add('copyright');
        
            let copyrightSpan = document.createElement('span');
            copyrightSpan.innerHTML = '© ' + data.copyright;
            copyrightDiv.append(copyrightSpan);
            this.container.append(copyrightDiv);
        }  

        this.container.append(line);
    }

    this.addPictureOfDay = function() {
        let element = document.createElement('div');
        element.setAttribute("class", "today");
        if(this.date === undefined) {
            this.date = new Date();
        } else {
            this.date = new Date(this.date.setDate(this.date.getDate() - 1));
        }
        fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=' + this.dateFormatter())
        .then(response => response.json())
        .then(data => this.renderApp(data))

        element.innerText = this.dateFormatter();
        this.container.append(element);
    }
    this.addPictureOfDay();
    body.append(this.container);
}

const apod = new Apod('apod');