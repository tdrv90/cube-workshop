module.exports = {
    development: {
        port: process.env.PORT || 3000,
        databaseUrl: `mongodb+srv://user:${process.env.DB_PASSWORD}@cluster0-37hqh.mongodb.net/Cube?retryWrites=true&w=majority`
    },
    production: {}
};