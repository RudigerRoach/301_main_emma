/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.io.IOException;
import java.net.URL;
import java.util.ResourceBundle;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.TextField;
import javafx.stage.Stage;

/**
 * FXML Controller class
 *
 * @author Endzeit
 */
public class AddJudgeDialogController implements Initializable {
    private Stage dialogStage;

    /**
     * Initializes the controller class.
     */
    @Override
    public void initialize(URL url, ResourceBundle rb) {
        // TODO
    }    
    @FXML
    private TextField email;
    private Person person;
    private boolean okClicked = false;
    
    public void setDialogStage(Stage dialogStage) {
        this.dialogStage = dialogStage;
    }
            
    public void setPerson(Person person) {
        this.person = person;
    }
    public Person getPerson() {
        return this.person;
    }
    
     public boolean isOkClicked() {
        return okClicked;
    }
    
    @FXML
    private void buttonClickedHandler(ActionEvent event) throws IOException 
    {
    okClicked = true;    
    dialogStage.close();
    
    }
}
