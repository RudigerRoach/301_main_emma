/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;
import java.net.URL;
import java.util.Optional;
import java.util.ResourceBundle;
import javafx.beans.property.SimpleStringProperty;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.control.Button;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.stage.Stage;
import javax.imageio.ImageIO;
import org.thehecklers.dialogfx.DialogFX;
import org.thehecklers.dialogfx.DialogFX.Type;



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
    @FXML
    private Button importJudge;
    
    @FXML
    private CheckBox controlledSession;
   
    @FXML
    private CheckBox openSession;
    
    @FXML
    private CheckBox commentsEnabled;
    
    @FXML
    private RadioButton Normal;
    
    @FXML
    private RadioButton Elimination;
    
    @FXML
    private RadioButton Winner;
    
    @FXML
    private TextField minimumScore;
    
    @FXML
    private TextField maximumScore;
    
    @FXML
    private TableView judges;
    
    @FXML
    private TableColumn<Person, String> colX;
    
    @FXML
    private TableView images;
    
    final ToggleGroup group = new ToggleGroup();
    
    Configuration mySession;
    
    public FXMLDocumentController()
    {
        
    }
    
    @FXML
    private void handleStartButtonAction(ActionEvent event) throws IOException {
        System.out.println("You called me!");
        
        String problems = "";
        boolean ok = true;
        
        linkedList names = new linkedList();
        linkedList name1 = new linkedList();
        linkedList name2 = new linkedList();
        linkedList name3 = new linkedList();
        linkedList name4 = new linkedList();
        linkedList name5 = new linkedList();
        
        name1.id = 1L;
        name2.id = 2L;
        name3.id = 3L;
        name4.id = 4L;
        name5.id = 5L;
        
        names.next = name1;
        name1.next = name2;
        name2.next = name3;
        name3.next = name4;
        name4.next = name5;
        
        BufferedImage[] images = new BufferedImage[5];
        images[0] = ImageIO.read(new File("image1.jpg"));
        images[1] = ImageIO.read(new File("image2.jpg"));        
        images[2] = ImageIO.read(new File("image3.jpg"));
        images[3] = ImageIO.read(new File("image4.jpg"));   
        images[4] = ImageIO.read(new File("image5.jpg"));
        System.out.println("image in 0 : " +images[0]);
        
        String[] judges = new String[5];
        judges[0]= "Johan";
        judges[1]= "test";
        judges[2]= "test123@test.com";
        judges[3]= "Test3";
        judges[4]= "Test4";
        
        String[] imgDetails = new String[5]; 
        
        imgDetails[0] = "Beauty comes in all shapes and sizes";
        imgDetails[1] = "Where I want to be";
        imgDetails[2] = "Natures perfect architecture";
        imgDetails[3] = "Huisie by die see";
        imgDetails[4] = "Not a cat you want to play with";
        
        String minStr = minimumScore.getText();
        int min =  0;
        boolean minwrong = false;
        for(int i =0;i<minStr.length();i++)
        {
            if (!Character.isDigit(minStr.charAt(i)))
            {
                ok = false;
                minwrong = true;
            }  
        }
        
        if(minwrong)
            problems += " the minimum range has an invalid input,";
        else 
            min = Integer.parseInt((minimumScore.getText()));
        
        
        
        String maxStr = maximumScore.getText();
        int max =  10;
        boolean maxwrong = false;
        for(int i =0;i<maxStr.length();i++)
        {
            if (!Character.isDigit(maxStr.charAt(i)))
            {
                ok = false;
                maxwrong = true;
            }  
        }
        
        if(maxwrong)
            problems += " the minimum range has an invalid input,";
        else 
            max =  Integer.parseInt((maximumScore.getText()));
        
        
        if(min > max)
        {
            ok = false;
            problems += " min needs to be smaller than max,";
        }
        
        
        
        boolean cont = controlledSession.isSelected();
        boolean open = openSession.isSelected();
        boolean comments = commentsEnabled.isSelected();
        String type = "normal";
        
        if(Normal.isSelected())
            type = "normal";
        else if (Elimination.isSelected())
            type = "elimination";
        else if (Winner.isSelected())
            type = "winner";
        else 
        {
            ok = false;
            problems += " no session type selected,";
        }
        
        if(ok == true)
        {
            mySession = new Configuration(names,images,judges,max,min,open,cont,imgDetails,type);
    //        FileOutputStream saveFile=new FileOutputStream("SaveObj.sav");
    //        ObjectOutputStream save = new ObjectOutputStream(saveFile);
    //        save.writeObject(mySession);
    //        save.close();

            try
            {
                uRateServer myServer = new uRateServer(mySession);
                myServer.startSession();
            }
            catch(Exception ex)
            {
                System.out.println(ex);
            } 

            FXMLLoader loader = new FXMLLoader(getClass().getResource("FXMLrunningSession.fxml"));
            Scene newScene = new Scene(loader.load());
            fxStage newStage = new fxStage(mySession);
            newStage.setScene(newScene);
            newStage.setTitle("Emma Simulator");
            newStage.setFullScreen(true);
            newStage.show();

            
            

            
            
            
        }
        else
        {
        DialogFX dialog = new DialogFX(Type.ERROR);
        dialog.setTitleText("The input is incorrect");
        dialog.setMessage("Problems:"+problems.substring(0, problems.length()-1)+".");
        dialog.showDialog();
        }
    }
    
    
    @FXML
    private void handleAddImage(ActionEvent event) throws IOException 
    {
    
    }
    
    @FXML
    private void handledeleteSelected(ActionEvent event) throws IOException 
    {
        
    
    }
    
    @FXML
    private void handleeditSelected(ActionEvent event) throws IOException 
    {
        
    
    }
    
    @FXML
    private void handleimportImage(ActionEvent event) throws IOException 
    {
        
    
    }
    
    @FXML
    private void handleRemoveJudge(ActionEvent event) throws IOException 
    {
        int selectedIndex = judges.getSelectionModel().getSelectedIndex();
        judges.getItems().remove(selectedIndex);
    
    }
    
    @FXML
    private void handleImportJudges(ActionEvent event) throws IOException 
    {
        
    
    
    
    
    }
    
    @FXML
    private void handleAddJudge(ActionEvent event) throws IOException 
    {
        
        FXMLLoader loader = new FXMLLoader(getClass().getResource("AddJudgeDialog.fxml"));
        Scene newScene = new Scene(loader.load());
        AddJudgeDialogController controller = loader.getController();
        Stage dialogStage = new Stage();
        dialogStage.setScene(newScene);
        dialogStage.setTitle("Add Judge");
        //controller.setDialogStage(dialogStage);
        dialogStage.show();
        controller.setPerson(new Person("Piet"));
        
        ObservableList<Person> data = judges.getItems();
        data.add(controller.getPerson());
        judges.setVisible(true);
        
        
    
    }
    
    @FXML
    private void handleExportJudges(ActionEvent event) throws IOException 
    {
        
    
    }


    
    @Override
    public void initialize(URL url, ResourceBundle rb) 
    {

        
        ObservableList<String> data =
        FXCollections.observableArrayList(
            new String("Jacob"),
            new String("Isabella"),
            new String("Ethan"),
            new String("Emma"),
            new String("Michael")
        );
        judges.setEditable(true);
        images.setEditable(true);
        images.setDisable(false);
        judges.setItems(data);
        colX.setCellValueFactory(new PropertyValueFactory("firstName"));
        colX.setText("Judges");
        colX.setVisible(true);
    }
    

     
     
     
}
