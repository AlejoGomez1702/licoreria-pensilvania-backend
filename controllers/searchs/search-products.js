/**
 * Busca las coincidencias con un usuario en la base de datos.
 * @param {*} term 
 * @param {*} res 
 * @returns 
 */
 const searchProducts = async( term = '', res = response ) => {

    // Buscar por ID
    const isMongoID = ObjectId.isValid( term );

    if ( isMongoID ) // Si se esta buscando por ID
    {
        const product = await Product.findById( term );
        return res.json({
            results: ( product ) ? [ product ] : []
        });
    }

    // Buscar por coincidencia
    const regex = new RegExp( term, 'i' );
    
    const productsMatch = await Product.find({
                                $or: [
                                    { name: regex }, 
                                    { description: regex },
                                    { features: regex }
                                ],
                                $and: [{ state: true }],                                
                            })
                            .populate('inventory', 'description')
                            .populate('category', 'name')
                            .populate('alcohol', 'alcohol')
                            .populate('unit', 'unit');

    const querys = {
        category : { path: 'category', match: {name: regex}, select: 'name' },
        unit : { path: 'unit', match: {unit: regex}, select: 'unit' } 
    };

    // Saqueme los productos que coinciden con la categoria 
    let productsMatchCategory = await Product.find()
                                            .populate( querys.category )
                                            .populate('inventory', 'description')
                                            .populate('alcohol', 'alcohol')
                                            .populate('unit', 'unit');
    // Los que no coinciden se borran.
    productsMatchCategory = productsMatchCategory.filter( product => (product.category !== null) );

    // Saqueme los productos que coinciden con la unidad de medida
    let productsMatchUnit = await Product.find()
                                            .populate( querys.unit )
                                            .populate('inventory', 'description')
                                            .populate('category', 'name')
                                            .populate('alcohol', 'alcohol');
    // Los que no coinciden se borran.               
    productsMatchUnit = productsMatchUnit.filter( product => (product.unit !== null) );    
                
    productsMatch.push(...productsMatchCategory, ...productsMatchUnit);

    const products = [ ...new Set(productsMatch) ];

    res.json({
        results: products
    });
};

module.exports = {
    searchProducts
};