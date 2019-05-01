class Router {
    constructor(node, routes){
        this.node = node;
        this.routes = routes;
    }

    start(){
        this.render();
        window.addEventListener('hashchange', this.render.bind(this));
    }

    render(){
        this.node.innerHTML = "";
        const component = this.activeRoute();
        if(component){
            const DOMNode = component.render();
            this.node.appendChild(DOMNode);
        }
    }

    activeRoute(){
        const hash = window.location.hash.substring(1);
        return this.routes[hash];
    }
}

module.exports = Router;