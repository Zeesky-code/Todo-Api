const supertest = require("supertest")
const app = require('../index')


describe("Todo Route", () => {

    it("GET /api/v1/todos works", async () => {
        const response = await supertest(app).get("/api/v1/todos ");
        expect(response.headers["content-type"]).toBe("application/json; charset=utf-8");
        expect(response.status).toBe(200)
        expect(response.body.todos.length).toBe(1)
    })
})