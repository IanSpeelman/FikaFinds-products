import request from "supertest"
import { app } from "../app"
import { jest, describe, test, expect } from "@jest/globals"
import { Product } from "../utils/database";

jest.mock('../utils/database', () => ({
    Product: {
        "id": 27,
        "name": "Hi there, General Kenobi",
        "image": "test",
        "price": 5,
        "category": "test",
        "stock": null,
        "amount": null,
        "createdAt": "2024-10-23T18:17:00.843Z",
        "updatedAt": "2024-10-23T18:17:00.843Z",
        findAll: jest.fn(),
        update: jest.fn(),
        destroy: jest.fn(),
        build: jest.fn(() => {
            const mockInstance = {
                save: jest.fn(),
            }
            return mockInstance
        }),
    }
}));
describe("GET /products", () => {
    test("Should return all products when there are product stored in the database", async () => {

        Product.findAll.mockResolvedValue(
            [
                {
                    "id": 27,
                    "name": "Hi there, General Kenobi",
                    "image": "test",
                    "price": 5,
                    "category": "test",
                    "stock": null,
                    "amount": null,
                    "createdAt": "2024-10-23T18:17:00.843Z",
                    "updatedAt": "2024-10-23T18:17:00.843Z"
                },
                {
                    "id": 28,
                    "name": "Hi there, General Kenobi",
                    "image": "test",
                    "price": 5,
                    "category": "test",
                    "stock": null,
                    "amount": null,
                    "createdAt": "2024-10-23T18:17:01.385Z",
                    "updatedAt": "2024-10-23T18:17:01.385Z"
                },

            ]
        )

        const response = await request(app).get("/products")

        expect(response.status).toBe(200)
        expect(response.header["content-type"]).toMatch("application/json")
        expect(response.body).toEqual([
            {
                "id": 27,
                "name": "Hi there, General Kenobi",
                "image": "test",
                "price": 5,
                "category": "test",
                "stock": null,
                "amount": null,
                "createdAt": "2024-10-23T18:17:00.843Z",
                "updatedAt": "2024-10-23T18:17:00.843Z"
            },

            {
                "id": 28,
                "name": "Hi there, General Kenobi",
                "image": "test",
                "price": 5,
                "category": "test",
                "stock": null,
                "amount": null,
                "createdAt": "2024-10-23T18:17:01.385Z",
                "updatedAt": "2024-10-23T18:17:01.385Z"
            },

        ])
    })

    test("should return 404 if there are no products in the database", async () => {
        Product.findAll.mockResolvedValue([])

        const response = await request(app).get("/products")

        expect(response.status).toBe(404)
        expect(response.body).toEqual({ err: "no products found" })
    })
})

describe("GET /product/:id", () => {
    test("should return single product when valid id is passed", async () => {
        Product.findAll.mockResolvedValue(
            {
                "id": 27,
                "name": "Hi there, General Kenobi",
                "image": "test",
                "price": 5,
                "category": "test",
                "stock": null,
                "amount": null,
                "createdAt": "2024-10-23T18:17:00.843Z",
                "updatedAt": "2024-10-23T18:17:00.843Z"
            },
        )

        const response = await request(app).get("/products/27")

        expect(response.status).toBe(200)
        expect(response.header["content-type"]).toMatch("application/json")
        expect(response.body).toEqual({
            "id": 27,
            "name": "Hi there, General Kenobi",
            "image": "test",
            "price": 5,
            "category": "test",
            "stock": null,
            "amount": null,
            "createdAt": "2024-10-23T18:17:00.843Z",
            "updatedAt": "2024-10-23T18:17:00.843Z"
        })

    })
    test("should return status code 404 when no valid id is passed", async () => {
        const id = 29
        Product.findAll.mockResolvedValue([])

        const response = await request(app).get(`/products/${id}`)

        expect(response.status).toBe(404)
        expect(response.header["content-type"]).toMatch("application/json")
        expect(response.body).toEqual({ err: `product with id ${id} does not exist` })

    })
})

describe("POST /products", () => {
    test("should create product when required fields are passed with body", async () => {


        const response = await request(app).post("/products").send({
            name: "Hi there, General Kenobi",
            image: "test",
            price: 5,
            category: "test",
        })

        expect(response.status).toBe(201)
        expect(response.header["content-type"]).toMatch("application/json")
    })
    test("should return 406 when not all required fields are passed with body", async () => {
        const data = [
            { image: "test", price: 5, category: "test", },
            { name: "Hi there, General Kenobi", price: 5, category: "test", },
            { name: "Hi there, General Kenobi", image: "test", category: "test", },
            { name: "Hi there, General Kenobi", image: "test", price: 5, },
        ]

        for (let i = 0; i < data.length; i++) {
            const response = await request(app).post("/products").send(data[i])
            expect(response.status).toBe(406)
        }

    })
})

describe("PATCH /products/:id", () => {

    test("Should return edited version of the product", async () => {
        const returnedProduct = [{
            "id": 27,
            "name": "Hi there, General obi wan",
            "image": "image",
            "price": 6,
            "category": "cat",
            "stock": null,
            "amount": null,
            "createdAt": "2024-10-23T18:17:00.843Z",
            "updatedAt": "2024-10-23T18:17:00.843Z",
        }]

        Product.findAll.mockResolvedValue(returnedProduct)

        const response = await request(app).patch("/products/edit/27").send({
            "name": "Hi there, General obi wan",
            "image": "image",
            "price": 6,
            "category": "cat",
        })

        expect(response.status).toBe(200)
        expect(response.body).toEqual(returnedProduct)
    })

    test("Should return 406 if not all mandatory fields are present in body", async () => {

        const data = [
            { image: "test", price: 5, category: "test", },
            { name: "Hi there, General Kenobi", price: 5, category: "test", },
            { name: "Hi there, General Kenobi", image: "test", category: "test", },
            { name: "Hi there, General Kenobi", image: "test", price: 5, },
        ]

        for (let i = 0; i < data.length; i++) {
            const response = await request(app).patch("/products/edit/27").send(data[i])

            expect(response.status).toBe(406)
        }

    })
})

describe("DELETE /products/:id", () => {

    test("Should delete item if id passed with url parameters exist", async () => {
        Product.destroy.mockResolvedValue(true)


        const response = await request(app).delete("/products/10")
        expect(response.status).toBe(204)
    })

    test("should return with 404 if item does not exist", async () => {
        Product.destroy.mockResolvedValue(false)


        const response = await request(app).delete("/products/10")
        expect(response.status).toBe(404)
    })
})
