const cepService = axios.create({
    baseURL: 'https://viacep.com.br/ws/',
    timeout: 5000,
  });

try {
return cepService.get()
}
catch(err){
    console.error(err)
}


