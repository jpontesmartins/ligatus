class Service {
    constructor(service) {
        this.service = service;
    }

    getDependencies = async file => {
        return await this.service.getDependencies(file);
    }

}

module.exports = Service;