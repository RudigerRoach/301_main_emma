/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.util.ResourceBundle;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.Node;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.stage.FileChooser;
import javafx.stage.Stage;

/**
 * FXML Controller class
 *
 * @author Endzeit
 */

public class AddImageController implements Initializable {

    /**
     * Initializes the controller class.
     */
    
    
    @FXML
    private Button browse;
    
    @FXML
    private Button add;
    
    @FXML
    private TextField descript;
    
    @FXML private Label lblIn;
    @Override
    public void initialize(URL url, ResourceBundle rb) {
        // TODO
    }    
    
    String imagePath;
    String description;
    File selectedFile = null;
    boolean valid = false;
    
    @FXML
    private void browseForImage(ActionEvent event) throws IOException 
    {
        System.out.println("#browseForImage handler called");
        Stage fileGetter = new Stage();
        FileChooser myChooser = new FileChooser();
        selectedFile = myChooser.showOpenDialog(fileGetter);
        myChooser.getExtensionFilters().addAll
        (
            new FileChooser.ExtensionFilter("All Images", "*.*"),
            new FileChooser.ExtensionFilter("JPG", "*.jpg"),
            new FileChooser.ExtensionFilter("PNG", "*.png")
        );
        
        if(selectedFile != null)
        {
            System.out.println(selectedFile.getAbsolutePath());
            imagePath=selectedFile.getAbsolutePath();
            lblIn.setText(imagePath);
        }
    
    }
    
    public void insertValues(String p,String des)
    {
        descript.setText(des);
        lblIn.setText(p);
        add.setText("change");
        valid = true;
        selectedFile = new File(p);
        description = des;
    }
    
    
    @FXML
    private void addImage(ActionEvent event) throws IOException 
    {
        description = descript.getText();
        if(selectedFile != null)
        {
            valid = true;
        }
        Node  source = (Node)  event.getSource(); 
        Stage stage  = (Stage) source.getScene().getWindow();
        stage.close();
    
    }
    
}
