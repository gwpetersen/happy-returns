// Import requirement packages
const { expect } = require('chai');
const axios = require('axios');


// normally I would save base url as an ENV vairable
// that way you can run test again multipl environements
// for this exercise however I will just define it here
const baseUrl = 'https://happyreturnsqatest.free.beeceptor.com';


describe('Happy Returns api REST test', async () => {

    it('GET /getProductVariants', async () => {
        const {status, data}  = await axios.get(`${baseUrl}/getProductVariants`);
        expect(status, 'api response should be 200').to.equal(200)
        expect(data.variants, 'variants should be an array').to.be.an('array');
        expect(data.variants, 'there should be at least one product variant').to.have.lengthOf.at.least(1);
    });

    it('POST /order', async () => {
        const getVariants = await axios.get(`${baseUrl}/getProductVariants`);
        expect(getVariants.status, 'api response should be 200').to.equal(200)
        expect(getVariants.data.variants, 'variants should be an array').to.be.an('array');
        expect(getVariants.data.variants, 'there should be at least one product variant').to.have.lengthOf.at.least(1);
        const orderBody = getVariants.data.variants;
        const { status, data } = await axios.post(`${baseUrl}/order`, {
            data: orderBody
        });
        expect(status, 'api response should be 201').to.equal(201)
        expect(data.text, 'should recieve a good job response').to.equal('Good job!')
    });


});