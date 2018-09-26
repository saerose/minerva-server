const { User, Book } = require('../models/user.model');

module.exports = {
  login: async (ctx) => {
  let insert = {}
    if(ctx.params.type === 'google') {
      if (!ctx.request.body.profileObj.googleId) {
        ctx.status = 401
        ctx.body = 'A google id is required in login type google'
      } else {
        insert = {
          id: ctx.request.body.profileObj.googleId,
          userName: ctx.request.body.profileObj.name,
          email: ctx.request.body.profileObj.email,
          photo: ctx.request.body.profileObj.imageUrl
        }
      }
    } else {
      ctx.status = 404
      ctx.body = 'A type is required.'
    }
    const exist = await User.find({id: ctx.request.body.profileObj.googleId})
    if(exist.length) {
      ctx.body = exist[0]
      ctx.status = 200
    } else {
      const newUser = new User(insert)
      const saved = await newUser.save()
        .catch((err) => console.log(err))
      if (!saved) {
        ctx.status = 401
        ctx.body = 'All fields are required on sign up'
      } else {
        ctx.body = newUser
        ctx.status = 201
      }
    }
  },

  addBookToLibrary: async (ctx) => {
    /**
     * { book:
   { kind: 'books#volume',
     id: 'fnQ9mGMH15oC',
     etag: 'dCj5gLLC9Fg',
     selfLink: 'https://www.googleapis.com/books/v1/volumes/fnQ9mGMH15oC',
     volumeInfo:
      { title: 'Cosmetología de Harry',
        authors: [Array],
        publisher: 'Ediciones Díaz de Santos',
        publishedDate: '1990',
        description:
         'La utilidad de la COSMETOLOGÍA DE HARRY, como libro de consulta a la vez completo y conciso, está corroborada por su continua popularidad en todas las partes del mundo: estamos convencidos de que, una vez más, esta séptima edición hallará una calurosa acogida. INDICE: La piel. Irritación y sensibilización de la piel. Nutrición y control hormonal de la piel. Cremas cutáneas. Astringentes y tónicos de la piel. Cremas protectoras y limpiadoras de las manos. Preparados para el baño. Productos cutáneos para bebés. Productos cutáneos para jóvenes. Antiperspirantes y desodorantes. Depilatorios. Preparados para el afeitado. Preparados para los pies. Productos protectores solares. Decolorantes o aclaradores de la piel. Mascarillas y máscaras faciales. Polvos y maquillaje facial. Las uñas. Preparados de manicura. El pelo. Champúes. Lociones y aerosoles fijadores y lacas capilares. Colorantes del cabello. El diente y la salud bucal, etc.',
        industryIdentifiers: [Array],
        readingModes: [Object],
        pageCount: 1062,
        printType: 'BOOK',
        categories: [Array],
        averageRating: 4,
        ratingsCount: 13,
        maturityRating: 'NOT_MATURE',
        allowAnonLogging: false,
        contentVersion: '1.1.1.0.preview.1',
        imageLinks: [Object],
        language: 'es',
        previewLink:
         'http://books.google.es/books?id=fnQ9mGMH15oC&printsec=frontcover&dq=isbn:9788487189388&hl=&cd=1&source=gbs_api',
        infoLink:
         'http://books.google.es/books?id=fnQ9mGMH15oC&dq=isbn:9788487189388&hl=&source=gbs_api',
        canonicalVolumeLink:
         'https://books.google.com/books/about/Cosmetolog%C3%ADa_de_Harry.html?hl=&id=fnQ9mGMH15oC' },
     saleInfo:
      { country: 'ES', saleability: 'NOT_FOR_SALE', isEbook: false },
     accessInfo:
      { country: 'ES',
        viewability: 'PARTIAL',
        embeddable: true,
        publicDomain: false,
        textToSpeechPermission: 'ALLOWED',
        epub: [Object],
        pdf: [Object],
        webReaderLink:
         'http://play.google.com/books/reader?id=fnQ9mGMH15oC&hl=&printsec=frontcover&source=gbs_api',
        accessViewStatus: 'SAMPLE',
        quoteSharingAllowed: false },
     searchInfo:
      { textSnippet:
         'La utilidad de la COSMETOLOGÍA DE HARRY, como libro de consulta a la vez completo y conciso, está corroborada por su continua popularidad en todas las partes del mundo: estamos convencidos de que, una vez más, esta séptima edición ...' } } }
     */
    const newBook = new Book(ctx.request.body.book)
    console.log(ctx.params.id)
    const user = await User.findOne({ id: ctx.params.id.toString() })
    console.log(user)
    // const updated = await User.updateOne({ id: ctx.params.id.toString() }, {books: [ ...user.books, newBook ] })
    //   .catch(console.error)
    if (updated) {
      ctx.status = 201
      ctx.body = user
    } else {
      ctx.status = 500
    }
  }
}
