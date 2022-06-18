import mongoose from 'mongoose'

const connect = async (uri) => {
    try {
        const connection = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(`MongoDB Connected: ${connection.connection.host}`)
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

export default connect
