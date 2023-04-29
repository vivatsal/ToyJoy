import mongoose from 'mongoose';

const Connection = async (username, password) => {
    const URL = `mongodb+srv://vatsalviven:bfMada4IHhVWxJ52@cluster0.ytm7cmo.mongodb.net/Toys?retryWrites=true&w=majority`
    try {
        await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false });
        console.log('Database Connected Succesfully');
    } catch(error) {
        console.log('Error: ', error.message);
    }

};

export default Connection;