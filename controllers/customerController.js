const db = require('../config/db.manager');
    exports.getAllCustomers = function (req, res) {
    const salesProduct = db.getCustomers().then(results=>{
        console.log(results);
        res.status(200).json({
        status: 'successfull',
        data: results.recordsets[0]
        }); // send all the data
    });
}
exports.getCustomerByID = function( req, res){
    const {id} = req.params; // get id
    res.status(200).json({
    status: 'not implemented'
    });
}
    exports.createNewCustomer = async function( req, res){ // must select the body to be raw->JSON in Postman
        // const {body} = req;// req.body (attribute)
        // const {id} = req.params;// get (attribute)
        try{
        const saved = await db.saveCustomer(req.body)
        if (saved){
        res.status(200).json({
        status: 'successfull',
        message: 'Customer saved successfully!'
        });}
        else{
            res.status(500).json({
                status: 'Failed',
                message: 'Request Failed!'
                }); 
        }
    } catch(error){
        res.status(500).json({
            status: 'Failed',
            Error: error
            });
    }
    }

    exports.updateAddressByID = async (req, res) => {
        const id = req.params.id;
        const updatedData = req.body;
      
        try {
          // Validate the updatedData if needed
      
          const [num] = await Address.update(updatedData, {
            where: { id: id }
          });
      
          if (num === 1) {
            res.status(204).send(); // HTTP 204 No Content for successful update
          } else {
            res.status(404).send({
              message: `Cannot update Address with id=${id}. Maybe Address was not found or req.body is empty!`
            });
          }
        } catch (err) {
          console.error(err);
          res.status(500).send({
            message: "Error updating Address with id=" + id,
            status: 'Failed',
            //Error: err
          });
        }
      };


    exports.patchCustomerById = function( req, res){ // must select the body to beraw->JSON in Postman
        const {body} = req;// req.body (attribute)
        
        const {id} = req.params;// get id (attribute)
        res.status(200).json({
        status: 'not implemented'
        });
    }

    

    exports.deleteCustomerByID = async (req, res) => {
        const customerID = req.params.id; // Get the customer ID from the URL parameters
      
        try {
          // Find the customer by ID and delete it
          const deletedCustomer = await Customer.destroy({
            where: { customerID: customerID }
          });
      
          if (deletedCustomer === 1) {
            // Customer was successfully deleted
            res.status(204).send(); // Respond with HTTP 204 No Content
          } else {
            // Customer with the specified ID was not found
            res.status(404).json({ message: `Customer with ID ${customerID} not found.` });
          }
        } catch (error) {
          // Handle errors
          console.error('Error deleting customer:', error);
          res.status(500).json({ 
            message: 'Error deleting customer.' ,
            status: 'Failed',
            //Error: error
        });
        }
      };
      
      
      
      
      

    