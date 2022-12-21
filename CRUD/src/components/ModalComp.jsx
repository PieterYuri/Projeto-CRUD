import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Box,
  } from "@chakra-ui/react";
  import { useState } from "react";
  import { Formik,Field,Form} from 'formik';
  import schema from './schema';
  import './ModalStyle.css' ;
  
  const ModalComp = ({ data, setData, dataEdit, isOpen, onClose }) => {
    const [name, setName] = useState(dataEdit.name || "");
    const [email, setEmail] = useState(dataEdit.email || "");
  
    const handleSave = () => {
      
      if (!name || !email) return;
  
      if (emailAlreadyExists()) {
        return alert("E-mail já cadastrado!");
      }
  
      if (Object.keys(dataEdit).length) {
        data[dataEdit.index] = { name, email };
      }
  
      const newDataArray = !Object.keys(dataEdit).length
        ? [...(data ? data : []), { name, email }]
        : [...(data ? data : [])];
  
      localStorage.setItem("cad_cliente", JSON.stringify(newDataArray));
  
      setData(newDataArray);
  
      onClose();
    };
    function onSubmit(values,actions){
      console.log('SUBMIT',values)
    }
  
    const emailAlreadyExists = () => {
      if (dataEdit.email !== email && data?.length) {
        return data.find((item) => item.email === email);
      }
  
      return false;
    };
  
    return (
      <div>
      <Formik
      validationSchema={schema}
      onSubmit={onSubmit}
      validateOnMount
      initialValues={{
        name: '',
        email: '',
      }}
      render={({values ,errors,touched   }) => (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Cadastrar</ModalHeader>
            <ModalCloseButton className="xButton" />
            <ModalBody>
              <FormControl>
              <Form>
                <Box>
                <div>
                  <FormLabel>Nome</FormLabel>
                  <Field
                   className='style'
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors.name &&(
                    <span>{errors.name}</span>
                  )}
                  </div>
                </Box>
                </Form>
                <Box>
                  <div>
                  <FormLabel>E-mail</FormLabel>
                  <Field
                    className="style"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email &&(
                    <span>{errors.email}</span>
                  )}
                  </div>
                </Box>
              </FormControl>
            </ModalBody>
            <Form>

            <ModalFooter justifyContent="start">
              <Button colorScheme="green" mr={240} onClick={handleSave}  type="submit">
                Salvar
              </Button>
              
            </ModalFooter>
            </Form>
          </ModalContent> 
        </Modal>
        )}
        />
         
       
      </div>
    );
  };
  
  export default ModalComp;