/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.awt.image.BufferedImage;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.ResourceBundle;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.control.Button;
import javafx.stage.*;
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
    
        public class Item 
        {
        public String email = new String();
         
        public String getEmail() {
            return email;
        }
 
        }
    
    
    
    
    
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
    TableView<String> judges;
        
    @FXML
    TableColumn email;
    
    
    @FXML
    private TableView imageTable;
    
    final ToggleGroup group = new ToggleGroup();
    
    Configuration mySession;
    LinkedList imagePaths = new LinkedList();
    LinkedList imageDescription = new LinkedList();
    LinkedList judgesLL = new LinkedList();

    ObservableList<String> data;
    
    public FXMLDocumentController()
    {
        
    }
    
    @FXML
    private void handleStartButtonAction(ActionEvent event) throws IOException, Exception {
        System.out.println("You called me!");
        
        String problems = "";
        boolean ok = true;
        
        
        
        
        //Fix this
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
        
        BufferedImage[] images = null;
        if(imagePaths.isEmpty() != true)
        {
            images = new BufferedImage[imagePaths.size()];
            for(int i = 0; i< imagePaths.size();i++)
                images[i]= ImageIO.read(new File(imagePaths.get(i).toString()));
            System.out.println("image in 0 : " +images[0]);
        }
        
        
        
        
//        images[0] = ImageIO.read(new File("image1.jpg"));
//        images[1] = ImageIO.read(new File("image2.jpg"));        
//        images[2] = ImageIO.read(new File("image3.jpg"));
//        images[3] = ImageIO.read(new File("image4.jpg"));   
//        images[4] = ImageIO.read(new File("image5.jpg"));
        
        
//        String[] judges = new String[5];
//        judges[0]= "Johan";
//        judges[1]= "test";
//        judges[2]= "test123@test.com";
//        judges[3]= "Test3";
//        judges[4]= "Test4";
        
        String[] judges = new String[judgesLL.size()];
        for(int i = 0; i< judgesLL.size();i++)
            judges[i]= judgesLL.get(i).toString();
        
        
        String[] imgDetails = new String[imageDescription.size()]; 
        for(int i = 0; i< imageDescription.size();i++)
            imgDetails[i]= imageDescription.get(i).toString();
        
//        String[] imgDetails = new String[5]; 
//        
//        imgDetails[0] = "Beauty comes in all shapes and sizes";
//        imgDetails[1] = "Where I want to be";
//        imgDetails[2] = "Natures perfect architecture";
//        imgDetails[3] = "Huisie by die see";
//        imgDetails[4] = "Not a cat you want to play with";
        
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
        
        if(judges.length < 1 && !open)
        {
            ok = false;
            problems += " there are no judges,";
        }
        
        if(imagePaths.isEmpty())
        {
            ok = false;
            problems += " there are no images,";
        }
            
        if(Normal.isSelected())
            type = "normal";
        else if (Elimination.isSelected())
            type = "yesNo";
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

             

            FXMLLoader loader = new FXMLLoader(getClass().getResource("FXMLrunningSession.fxml"));
            Scene newScene = new Scene(loader.load());
            Stage newStage = new Stage();
            newStage.setScene(newScene);
            newStage.setTitle("Emma Simulator");
            FXMLrunningSessionController controller = loader.getController();
            controller.setConfig(mySession,imagePaths);    
            newStage.showAndWait();
        }
        else
        {
        DialogFX dialog = new DialogFX(Type.ERROR);
        dialog.setTitleText("Invalid Input");
        dialog.setMessage("Problems:"+problems.substring(0, problems.length()-1)+".");
        dialog.showDialog();
        }
    }
    
    
    @FXML
    private void handleAddImage(ActionEvent event) throws IOException 
    {
        FXMLLoader loader = new FXMLLoader(getClass().getResource("AddImage.fxml"));
        Scene newScene = new Scene(loader.load());
        AddImageController controller = loader.getController();
        Stage dialogStage = new Stage();
        dialogStage.setScene(newScene);
        dialogStage.setTitle("Add Image");
        //controller.setDialogStage(dialogStage);
        dialogStage.showAndWait();
        if(controller.valid == true)
        {
            imagePaths.add(controller.imagePath);
            imageDescription.add(controller.description);  
            System.out.println("after add shows descript: "+ controller.description);
        }
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
        FXMLLoader loader = new FXMLLoader(getClass().getResource("ImportImagesDialog.fxml"));
        Scene newScene = new Scene(loader.load());
        ImportImagesDialogController controller = loader.getController();
        Stage dialogStage = new Stage();
        dialogStage.setScene(newScene);
        dialogStage.setTitle("Add Image");
        //controller.setDialogStage(dialogStage);
        dialogStage.showAndWait();
        if(controller.valid == true)
        {
            int dist = controller.imagePaths.size();
            
            for(int i = 0; i < controller.imagePaths.size(); i++)
            {
                imagePaths.add(controller.imagePaths.get(i));
            }
            
            if(controller.imagePaths.size() < controller.descriptions.size())
            {
                for(int i = 0; i < controller.imagePaths.size(); i++)
                {
                    imageDescription.add(controller.descriptions.get(i));
                }
                
            }
            else
            {
                for(int i = 0; i < controller.descriptions.size(); i++)
                {
                    imageDescription.add(controller.descriptions.get(i));
                }
                int diff =controller.imagePaths.size() - controller.descriptions.size();
                
                for(int i = 0; i < diff; i++)
                {
                    imageDescription.add("");
                }
            }
            
            
        }
        
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
        Stage fileGetter = new Stage();
        FileChooser myChooser = new FileChooser();
        FileChooser.ExtensionFilter extFilter = new FileChooser.ExtensionFilter("TXT files (*.txt)", "*.txt");
        myChooser.getExtensionFilters().add(extFilter);
        File selectedFile = myChooser.showOpenDialog(fileGetter);
        
        FileReader fr = new FileReader(selectedFile.getAbsolutePath()); 
        BufferedReader br = new BufferedReader(fr); 
        String s; 
        while((s = br.readLine()) != null) { 
        judgesLL.add(s);
        } 
        fr.close(); 
 
        
        
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
        dialogStage.showAndWait();
        if(controller.valid == true)
            judgesLL.add(controller.email.getText());
        
        
    
    }
    
    @FXML
    private void handleExportJudges(ActionEvent event) throws IOException 
    {
        Stage fileGetter = new Stage();
        FileChooser myChooser = new FileChooser();
        FileChooser.ExtensionFilter extFilter = new FileChooser.ExtensionFilter("TXT files (*.txt)", "*.txt");
        myChooser.getExtensionFilters().add(extFilter);
        File file = myChooser.showSaveDialog(fileGetter);   
        if (file != null) 
        {
            File outfile = new File(file.getAbsolutePath());
            // creates the file
            file.createNewFile();
            // creates a FileWriter Object
            FileWriter writer = new FileWriter(outfile); 
            // Writes the content to the file
            String judgesString = "";
            for(int i = 0; i <judgesLL.size();i++)
                judgesString += judgesLL.get(i).toString()+"\r\n";
            
            writer.write(judgesString); 
            writer.flush();
            writer.close();
        }
    }


    
    @Override
    public void initialize(URL url, ResourceBundle rb) 
    {
        System.out.println(judges);
        List<String> row = new ArrayList<String>();
        row.add("tester");
        TableColumn [] tableColumns = new TableColumn[row.size()];     


            TableRow<String> row1 = new TableRow<>();
            judges.getItems().add("Testing");
            judges.getItems().add("Testing");
        

        //ObservableList<ObservableList> csvData = FXCollections.observableArrayList();
        //judges.setItems(row);
        
        //row1.addAll("d22");
        //csvData.add(row);
        //csvData.add(row1);
//        try
//        {
//            judges.getItems().add("testing");
//        }
//        catch(Exception ex){System.out.println(ex);}
        

        
        
   }    
    
    
    

     
     
     
}
