const getOfferInfos = () => {
    return {
        "title": "Essentiel",
        "commit": "avec engagement",
        "oldPrice": "11,99€",
        "newPrice": "9,99€/mois",
        "duration": "pendant 12 mois au lieu de 11,99€/mois"
    }
}

const initTemplate = () => {
    const offerInfos = getOfferInfos();
    const template = `
        <h2 class="title">${offerInfos.title}</h2>
        <p class="subtitle">${offerInfos.commit}</p>
        <p class="new-price"><del class="old-price">${offerInfos.oldPrice}</del> ${offerInfos.newPrice}</p>
        <p class="description">${offerInfos.duration}</p>
    `;
    document.querySelector('.offer-infos').innerHTML = template;
}

export {
    initTemplate
}