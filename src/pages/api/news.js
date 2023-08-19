
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qzwvv.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function run(req, res) {
    try {
        await client.connect();
        const newsCollection = client.db("news-protal").collection("news")
        if (req.method === "GET") {
            const news = await newsCollection.find({}).toArray()
            res.send({
                message: "Success",
                status: 200,
                data: news
            })
        }

        if (req.method === "POST") {
            const news = req.body;
            const result = await newsCollection.insertOne(news);
            res.json(result)
        }
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}

export default run;
