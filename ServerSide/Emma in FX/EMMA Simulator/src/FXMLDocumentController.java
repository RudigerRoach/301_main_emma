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
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.stage.Stage;


/**
 *
 * @author Endzeit
 */
public class FXMLDocumentController implements Initializable{
     /**
     * Initializes the controller class.
     */
    
    @FXML
    private Button start;
   
    public FXMLDocumentController()
    {
        
    }
    
    @FXML
    private void handleStartButtonAction(ActionEvent event) throws IOException {
        System.out.println("You clicked me!");
        Parent root = FXMLLoader.load(getClass().getResource("FXMLrunningSession.fxml"));
        Scene newScene = new Scene(FXMLLoader.load(getClass().getResource("FXMLrunningSession.fxml")));
        Stage newStage = new Stage();
        newStage.setScene(newScene);
        newStage.setTitle("Emma Simulator");
        newStage.show();
        
    }
    
    @Override
    public void initialize(URL url, ResourceBundle rb) {
        // TODO
    }
}
