import java.awt.image.BufferedImage;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.net.URL;
import java.util.LinkedList;
import java.util.ResourceBundle;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.collections.transformation.FilteredList;
import javafx.collections.transformation.SortedList;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Node;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.control.Button;
import javafx.stage.*;
import javafx.stage.Stage;
import javax.imageio.ImageIO;
import org.thehecklers.dialogfx.DialogFX;
import org.thehecklers.dialogfx.DialogFX.Type;

public class FXMLDocumentController implements Initializable{

    
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
    TableView<Person> judges;
        
    @FXML
    private TableColumn<Person, String> email;
    
    
    @FXML
    private TableView<Images> imageTable;
    @FXML
    private TableColumn<Images, String> imagePath;
    @FXML
    private TableColumn<Images, String> descript;
    
    final ToggleGroup group = new ToggleGroup();
    
    Configuration mySession;
    LinkedList imagePaths = new LinkedList();
    LinkedList imageDescription = new LinkedList();
    LinkedList judgesLL = new LinkedList();
    private ObservableList<Person> masterData = FXCollections.observableArrayList();
    private ObservableList<Images> imageData = FXCollections.observableArrayList();
    
    public FXMLDocumentController()
    {

    }
    
    @FXML
    private void handleStartButtonAction(ActionEvent event) throws IOException, Exception {
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
        
        BufferedImage[] images = null;
        int notbuff=0;
        if(imagePaths.isEmpty() != true)
        {
            images = new BufferedImage[imagePaths.size()];
            for(int i = 0; i< imagePaths.size();i++)
            {
                try
                {
                images[i]= ImageIO.read(new File(imagePaths.get(i).toString()));
                }
                catch(Exception x){notbuff++;}
            }
        }
        
        String[] judges = new String[judgesLL.size()];
        for(int i = 0; i< judgesLL.size();i++)
            judges[i]= judgesLL.get(i).toString();
        
        String[] imgDetails = new String[imageDescription.size()]; 
        for(int i = 0; i< imageDescription.size()-notbuff;i++)
            imgDetails[i]= imageDescription.get(i).toString();
        
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
            
            //Create Configuration
            mySession = new Configuration(names,images,judges,max,min,open,cont,imgDetails,type,comments);

             

            FXMLLoader loader = new FXMLLoader(getClass().getResource("FXMLrunningSession.fxml"));
            Scene newScene = new Scene(loader.load());
            newScene.getStylesheets().add("Scema/other.css");
            Stage newStage = new Stage();
            newStage.setScene(newScene);
            newStage.setTitle("Emma Simulator");
            FXMLrunningSessionController controller = loader.getController();
            controller.setConfig(mySession);
            newStage.initStyle(StageStyle.UNDECORATED);
            Node  source = (Node) event.getSource(); 
            Stage stage  = (Stage) source.getScene().getWindow();
            stage.close();
            controller.addImages(imagePaths,imageDescription);
            controller.loadImages();
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
        newScene.getStylesheets().add("Scema/other.css");
        AddImageController controller = loader.getController();
        Stage dialogStage = new Stage();
        dialogStage.setScene(newScene);
        dialogStage.setTitle("Add Image");
        dialogStage.showAndWait();
        if(controller.valid == true)
        {
            try
            {
            imagePaths.add(controller.imagePath);
            imageDescription.add(controller.description);  
            }
            catch(Exception x){}
        }
        loadImages();
    }
    
    @FXML
    private void handledeleteSelected(ActionEvent event) throws IOException 
    {
        try
        {
            int selectedIndex = imageTable.getSelectionModel().getSelectedIndex();
            imagePaths.remove(selectedIndex);
            imageDescription.remove(selectedIndex);
        }
        catch(Exception x){}
        loadImages();
    }
    
    @FXML
    private void handleeditSelected(ActionEvent event) throws IOException 
    {
        try
        {
            int selectedIndex = imageTable.getSelectionModel().getSelectedIndex();
            FXMLLoader loader = new FXMLLoader(getClass().getResource("AddImage.fxml"));
            Scene newScene = new Scene(loader.load());
            newScene.getStylesheets().add("Scema/other.css");
            AddImageController controller = loader.getController();
            Stage dialogStage = new Stage();
            dialogStage.setScene(newScene);
            dialogStage.setTitle("Edit Image");
            controller.insertValues(imagePaths.get(selectedIndex).toString(), imageDescription.get(selectedIndex).toString());
            dialogStage.showAndWait();
                
            
            String imp = imagePaths.get(selectedIndex).toString();
                imagePaths.remove(selectedIndex);
                imageDescription.remove(selectedIndex);
                if(controller.imagePath != null)
                    imagePaths.add(controller.imagePath.toString());
                else
                    imagePaths.add(imp);
                imageDescription.add(controller.description.toString()); 
            loadImages();
            
        }catch(Exception x){}

    
    }
    
    @FXML
    private void handleimportImage(ActionEvent event) throws IOException 
    {
        FXMLLoader loader = new FXMLLoader(getClass().getResource("ImportImagesDialog.fxml"));
        Scene newScene = new Scene(loader.load());
        newScene.getStylesheets().add("Scema/other.css");
        ImportImagesDialogController controller = loader.getController();
        Stage dialogStage = new Stage();
        dialogStage.setScene(newScene);
        dialogStage.setTitle("Add Images");
        dialogStage.showAndWait();
        if(controller.valid == true)
        {
            int notAdded = 0;
            for(int i = 0; i < controller.imagePaths.size(); i++)
            {
                int spot = controller.imagePaths.get(i).toString().indexOf(".") + 1;
                        String ext = controller.imagePaths.get(i).toString().substring(spot);
                if(ext.equals("jpg")||ext.equals("png"))
                    imagePaths.add(controller.imagePaths.get(i));
                else notAdded++;
            }

            if(controller.imagePaths.size()-notAdded < controller.descriptions.size())
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
                int diff = (controller.imagePaths.size()-notAdded) - controller.descriptions.size();
                for(int i = 0; i < diff; i++)
                {
                    imageDescription.add("");

                }
            }      
        }
        loadImages();
        
    }
    
    @FXML
    private void handleRemoveJudge(ActionEvent event) throws IOException 
    {
        try
        {
            int selectedIndex = judges.getSelectionModel().getSelectedIndex();
            judgesLL.remove(selectedIndex);
            loadJudges();
        }
        catch(Exception x){}
        
    }
    
    @FXML
    private void handleImportJudges(ActionEvent event) throws IOException 
    {
        Stage fileGetter = new Stage();
        FileChooser myChooser = new FileChooser();
        FileChooser.ExtensionFilter extFilter = new FileChooser.ExtensionFilter("TXT files (*.txt)", "*.txt");
        myChooser.getExtensionFilters().add(extFilter);
        File selectedFile = myChooser.showOpenDialog(fileGetter);
        try
        {    
            FileReader fr = new FileReader(selectedFile.getAbsolutePath()); 
            BufferedReader br = new BufferedReader(fr); 
            String s; 
            while((s = br.readLine()) != null) 
            { 
                judgesLL.add(s);
            } 
            fr.close(); 
        }
        catch(Exception x){}
        
        loadJudges();
        
        
    }
    
    @FXML
    private void handleAddJudge(ActionEvent event) throws IOException 
    {
        
        FXMLLoader loader = new FXMLLoader(getClass().getResource("AddJudgeDialog.fxml"));
        Scene newScene = new Scene(loader.load());
        newScene.getStylesheets().add("Scema/other.css");
        AddJudgeDialogController controller = loader.getController();
        Stage dialogStage = new Stage();
        dialogStage.setScene(newScene);
        dialogStage.setTitle("Add Judge");
        //controller.setDialogStage(dialogStage);
        dialogStage.showAndWait();
        if(controller.valid == true)
            judgesLL.add(controller.email.getText());
        loadJudges();
        
    
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
    }  
    
    public void loadJudges()
    {
        
        masterData.clear();
        if(judgesLL.size()>0)
        {
            for(int i =0; i< judgesLL.size();i++)
                masterData.add(new Person(judgesLL.get(i).toString()));

            email.setCellValueFactory(cellData -> cellData.getValue().emailProperty());
                    FilteredList<Person> filteredData = new FilteredList<>(masterData, p -> true);
                    SortedList<Person> sortedData = new SortedList<>(filteredData);
                    sortedData.comparatorProperty().bind(judges.comparatorProperty());
                    judges.setItems(sortedData);

         }
    }
    
    public void loadImages()
    {
        imageData.clear();
        if(imagePaths.size() > 0)
        {
        
        
            for(int i =0; i< imagePaths.size();i++)
            {
                imageData.add(new Images(imagePaths.get(i).toString(),imageDescription.get(i).toString()));
            }

            imagePath.setCellValueFactory(cellData -> cellData.getValue().imageProperty());
            descript.setCellValueFactory(cellData -> cellData.getValue().descriptionProperty());

                    FilteredList<Images> filteredData = new FilteredList<>(imageData, p -> true);
                    SortedList<Images> sortedData = new SortedList<>(filteredData);
                    sortedData.comparatorProperty().bind(imageTable.comparatorProperty());
                    imageTable.setItems(sortedData);
           }
    }
   
}