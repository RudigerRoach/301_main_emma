/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.net.URL;
import java.util.LinkedList;
import java.util.List;
import java.util.ResourceBundle;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.Node;
import javafx.scene.control.Label;
import javafx.stage.FileChooser;
import javafx.stage.Stage;

/**
 * FXML Controller class
 *
 * @author Endzeit
 */
public class ImportImagesDialogController implements Initializable {

    /**
     * Initializes the controller class.
     */
    @Override
    public void initialize(URL url, ResourceBundle rb) {
        // TODO
    }    
    
    
    @FXML private Label lblPhotos;
    @FXML private Label lblFile;
    
    List<File> selectedPhotos;
    File selectedFile;
    boolean valid = false;
    LinkedList imagePaths = new LinkedList();
    LinkedList descriptions = new LinkedList();
    
    @FXML
    private void browseForImages(ActionEvent event) throws IOException 
    {
        Stage fileGetter = new Stage();
        FileChooser myChooser = new FileChooser();
        List<File> selectedFiles = myChooser.showOpenMultipleDialog(fileGetter);
        myChooser.getExtensionFilters().addAll
        (
            new FileChooser.ExtensionFilter("All Images", "*.*"),
            new FileChooser.ExtensionFilter("JPG", "*.jpg"),
            new FileChooser.ExtensionFilter("PNG", "*.png")
        );
        
        
        if(selectedFiles != null)
        {
            lblPhotos.setText(selectedFiles.size() + " photos are selected.");
            selectedPhotos = selectedFiles;
            int size = selectedFiles.size();
            for(int i=0 ;i < size; i++)
            {
                imagePaths.add(selectedFiles.get(i).getAbsolutePath());
                System.out.println(selectedFiles.get(i).getAbsolutePath());
            }
        }

    }
    
    @FXML
    private void browseForFile(ActionEvent event) throws IOException 
    {
        Stage fileGetter = new Stage();
        FileChooser myChooser = new FileChooser();
        FileChooser.ExtensionFilter extFilter = new FileChooser.ExtensionFilter("TXT files (*.txt)", "*.txt");
        myChooser.getExtensionFilters().add(extFilter);
        selectedFile = myChooser.showOpenDialog(fileGetter); 
        lblFile.setText(selectedFile.getAbsolutePath());
        
        
        if(selectedFile!=null)
        {
            FileReader fr = new FileReader(selectedFile.getAbsolutePath()); 
            BufferedReader br = new BufferedReader(fr); 
            String s; 
            while((s = br.readLine()) != null) { 
            descriptions.add(s);
            } 
            fr.close(); 
        }

    }
    
    @FXML
    private void addImage(ActionEvent event) throws IOException 
    {

        if(selectedFile != null && selectedPhotos != null)
        {
            valid = true;
        }
        Node  source = (Node)  event.getSource(); 
        Stage stage  = (Stage) source.getScene().getWindow();
        stage.close();
    
    } 
}
