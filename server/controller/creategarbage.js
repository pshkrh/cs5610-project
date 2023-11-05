const Garbage = require('../models/Garbagemodel')

exports.creategarbage = async () => {
    const papergarbage = new Garbage({
        category: "Paper",
        subcatagory: [{
            name: "NewsPaper",
            rate: 8,
            quntityin: "lb"
        }, {
            name: "Books",
            rate: 10,
            quntityin: "lb"
        }, {
            name: "Carton(House)",
            rate: 5,
            quntityin: "lb"
        }, {
            name: "Magazines",
            rate: 5,
            quntityin: "lb"
        }, {
            name: "White Papers",
            rate: 6.5,
            quntityin: "lb"
        }, {
            name: "Grey Board",
            rate: 2,
            quntityin: "lb"
        }, {
            name: "Record Paper",
            rate: 7,
            quntityin: "lb"
        }, {
            name: "Carton(Shop)",
            rate: 8,
            quntityin: "lb"
        }]
    })

    const plasticgarbage = new Garbage({
        category: "Plastic",
        subcatagory: [{
            name: "Soft Plastic",
            rate: 7,
            quntityin: "lb"
        }, {
            name: "Hard Plastic",
            rate: 5,
            quntityin: "lb"
        }, {
            name: "Mix Plastic",
            rate: 8,
            quntityin: "lb"
        }, {
            name: "Milk Covers",
            rate: 30,
            quntityin: "lb"
        }, {
            name: "Polythene (Mix)",
            rate: 25,
            quntityin: "lb"
        }, {
            name: "Plastic Jar(15 ltr)",
            rate: 10,
            quntityin: "piece",
            defaultWeight:0.5
        }, {
            name: "Fibre",
            rate: 8,
            quntityin: "lb"
        }, {
            name: "Plastic Jar(5 ltr)",
            rate: 15,
            quntityin: "piece",
            defaultWeight:0.2
        }, {
            name: "Plastic Bori",
            rate: 8,
            quntityin: "lb"
        }]
    })

    const metalgarbage = new Garbage({
        category: "Metal",
        subcatagory: [{
            name: "Iron",
            rate: 16,
            quntityin: "lb"
        }, {
            name: "Steel",
            rate: 10,
            quntityin: "lb"
        }, {
            name: "Teen",
            rate: 20,
            quntityin: "lb"
        }, {
            name: "Brass",
            rate: 180,
            quntityin: "lb"
        }, {
            name: "Copper",
            rate: 230,
            quntityin: "lb"
        }, {
            name: "Aluminium",
            rate: 65,
            quntityin: "lb"
        }, {
            name: "Oil Tin(15 ltr fresh)",
            rate: 20,
            quntityin: "piece",
            defaultWeight:1
        }, {
            name: "Oil Tin(15 ltr scrap)",
            rate: 10,
            quntityin: "piece",
            defaultWeight:1
        }, {
            name: "Casting Aluminium",
            rate: 45,
            quntityin: "lb"
        }]
    })

    const ewastegarbage = new Garbage({
        category: "E-Waste",
        subcatagory: [{
            name: "Home Appliances",
            rate: 20,
            quntityin: "lb"
        }, {
            name: "Monitors",
            rate: 400,
            quntityin: "piece",
            defaultWeight:4
        }, {
            name: "Circuit boards",
            rate: 15,
            quntityin: "lb"
        }, {
            name: "DVDs",
            rate: 15,
            quntityin: "lb"
        }, {
            name: "Printers",
            rate: 300,
            quntityin: "piece",
            defaultWeight:8
        }]
    })

    const othergarbage = new Garbage({
        category: "Other",
        subcatagory: [{
            name: "Mix-Waste",
            rate: 10,
            quntityin: "lb"
        }, {
            name: "Battries",
            rate: 40,
            quntityin: "lb"
        }, {
            name: "Tyre",
            rate: 15,
            quntityin: "piece",
            defaultWeight:2
        }]
    })

    await papergarbage.save()
    await plasticgarbage.save()
    await metalgarbage.save()
    await ewastegarbage.save()
    await othergarbage.save()

}
