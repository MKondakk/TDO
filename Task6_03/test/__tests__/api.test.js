const axios = require('axios');

const base_url = 'http://host.docker.internal:3000';

describe("API test suite", () => {
    describe("GET /data", () => {
        it("returns status code 200", async () => {
            const response = await axios.get(`${base_url}/data`);
            expect(response.status).toBe(200);
        });

        it("returns data from database", async () => {
            const response = await axios.get(`${base_url}/data`);
            expect(response.data).toEqual(expect.any(Array)); 
        });
    });

    describe("GET /data/average", () => {
        it("returns status code 200", async () => {
            const response = await axios.get(`${base_url}/data/average`);
            expect(response.status).toBe(200);
        });

        it("returns average from database", async () => {
            const response = await axios.get(`${base_url}/data/average`);
            expect(response.data.average).toBeDefined();
        });
    });

    describe("GET /data/:id", () => {
        it("returns status code 200 for valid ID", async () => {
            const id = 1; 
            const response = await axios.get(`${base_url}/data/${id}`);
            expect(response.status).toBe(200);
        });

        it("returns data for valid ID", async () => {
            const id = 1; 
            const response = await axios.get(`${base_url}/data/${id}`);
            expect(response.data).toEqual(expect.any(Array)); 
        });

        it("returns status code 404 for invalid ID", async () => {
            const id = 9999; 
            try {
                await axios.get(`${base_url}/data/${id}`);
            } catch (error) {
                expect(error.response.status).toBe(404);
            }
        });
    });
});
