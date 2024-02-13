const handler = (req, res) => {
    res.send('Welcome to express')
};
const handleAbout = (req, res) => {
    res.send('About')
};
const handleHome = (req, res) => {
    res.send('Home')
};
const handleContact = (req, res) => {
    res.send('Contact')
};
const handleNews = (req, res) => {
    res.send('News')
};

module.exports = {
    handler,
    handleAbout,
    handleHome,
    handleContact,
    handleNews
}