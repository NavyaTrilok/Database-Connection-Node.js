const sql = require('mssql');
const dbConnection = require('./db.config');
console.log(dbConnection);

async function getSalesProducts(){
    console.log(' Connecting to SQL....... Cloud Server');
    let dbContext = await sql.connect(dbConnection);
    console.log('The Databse connection was Successful');
    console.log('Getting data');
    let results = await dbContext.request()
    .query(`
    SELECT TOP(20)
    productId,
    name,
    productNumber,
    color
    listPrice
    FROM
    salesLT.Product
    `);
    console.log(`Returned SQL results`);
    return results;
    }


async function getCustomers(){
        console.log(' Connecting to SQL....... Cloud Server');
        let dbContext = await sql.connect(dbConnection);
        console.log('The Databse connection was Successful');
        console.log('Getting data');
        let results = await dbContext.request()
        .query(`
                SELECT *
                FROM
                salesLT.Customer
        `);
        console.log(`Returned SQL results`);
        return results;
}

async function saveCustomer(customerdata){
    try{
    console.log(' Connecting to SQL....... Cloud Server');
    let dbContext = await sql.connect(dbConnection);
    console.log('The Databse connection was Successful');
    console.log('Getting data');

    const query = `
    INSERT INTO salesLT.Customer (Title, FirstName, MiddleName, LastName, Suffix, CompanyName, SalesPerson, EmailAddress, Phone, PasswordHash, PasswordSalt, ModifiedDate)
    VALUES (@Title, @FirstName, @MiddleName, @LastName, @Suffix, @CompanyName, @SalesPerson, @EmailAddress, @Phone, @PasswordHash, @PasswordSalt, @ModifiedDate);
  `;

    const result = await dbContext.request()
    .input('CustomerID',sql.NVarChar, customerdata.customerID)
    .input('NameStyle',sql.NVarChar,customerdata.NameStyle)
    .input('Title', sql.NVarChar, customerdata.Title)
    .input('FirstName', sql.NVarChar, customerdata.FirstName)
    .input('MiddleName', sql.NVarChar, customerdata.MiddleName)
    .input('LastName', sql.NVarChar, customerdata.LastName)
    .input('Suffix',sql.NVarChar,customerdata.Suffix)
    .input('CompanyName',sql.NVarChar,customerdata.CompanyName)
    .input('SalesPerson',sql.NVarChar,customerdata.SalesPerson)
    .input('EmailAddress',sql.NVarChar,customerdata.EmailAddress)
    .input('Phone',sql.NVarChar,customerdata.Phone)
    .input('PasswordHash',sql.NVarChar,customerdata.PasswordHash)
    .input('PasswordSalt',sql.NVarChar,customerdata.rowguid)
    .input('ModifiedDate',sql.NVarChar,customerdata.ModifiedDate)


    .query(query);
    
    console.log(`Returned SQL results`);
    return results;
}
catch(error){
    console.log(error);
    throw error;
}
}


async function updateCustomer(AddressID, updatedCustomerData) {
    try {
      console.log('Connecting to SQL Server...');
      let dbContext = await sql.connect(dbConnection);
      console.log('Database connection successful');
  
      const query = `
        UPDATE salesLT.Address
        SET CustomerID = @CustomerID,  
        NameStyle = @NameStyle,
        Title = @Title,
        input = @input,
        MiddleName = @MiddleName,
        LastName = @LastName,
        Suffix = @Suffix,
        CompanyName = @CompanyName,
        SalesPerson = @SalesPerson,
        EmailAddress = @EmailAddress,
        Phone = @Phone,
        PasswordHash = @PasswordHash,
        PasswordSalt = @PasswordSalt
        WHERE CustomerID = @CustomerID;
      `;
  
      const result = await dbContext.request()
      .input('CustomerID', sql.NVarChar, updatedCustomerData.CustomerID)
      .input('NameStyle', sql.NVarChar, updatedCustomerData.NameStyle)
      .input('Title', sql.NVarChar, updatedCustomerData.Title)
      .input('input', sql.NVarChar, updatedCustomerData.input)
      .input('MiddleName', sql.NVarChar, updatedCustomerData.MiddleName)
      .input('LastName', sql.NVarChar, updatedCustomerData.LastName)
      .input('Suffix', sql.NVarChar, updatedCustomerData.Suffix)
      .input('CompanyName', sql.NVarChar, updatedCustomerData.CompanyName)
      .input('SalesPerson', sql.NVarChar, updatedCustomerData.SalesPerson)
      .input('EmailAddress', sql.NVarChar, updatedCustomerData.EmailAddress)
      .input('Phone', sql.NVarChar, updatedCustomerData.Phone)
      .input('PasswordHash', sql.NVarChar, updatedCustomerData.PasswordHash)
      .input('PasswordSalt', sql.NVarChar, updatedCustomerData.PasswordSalt)
      .query(query);
  
      console.log('Updated data successfully');
      return result;
    } catch (error) {
      console.error('Error updating data:', error);
      throw error;
    }
  }


  async function deleteCustomerByID(customerID) {
    try {
      console.log('Connecting to SQL Server...');
      let dbContext = await sql.connect(dbConnection);
      console.log('Database connection successful');
  
      const query = `
        DELETE FROM SalesLT.Customer
        WHERE CustomerID = @CustomerID;
      `;
  
      const result = await dbContext.request()
        .input('CustomerID', sql.NVarChar, customerID)
        .query(query);
  
      if (result.rowsAffected[0] === 1) {
        console.log('Customer deleted successfully');
      } else {
        console.log(`Customer with ID ${customerID} not found or not deleted.`);
      }
    } catch (error) {
      console.error('Error deleting customer:', error);
      throw error;
    }
  }
//Export
module.exports = {getCustomers :getCustomers, saveCustomer:saveCustomer, updateCustomer: updateCustomer, deleteCustomerByID: deleteCustomerByID, getSalesProducts: getSalesProducts };