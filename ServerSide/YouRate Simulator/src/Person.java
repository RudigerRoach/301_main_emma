import javafx.beans.property.SimpleStringProperty;
import javafx.beans.property.StringProperty;
 
public class Person {
   private final SimpleStringProperty email = new SimpleStringProperty("");

public Person() {
        this("");
    }
 
    public Person(String e) {
        setEmail(e);
    }


    
    public String getEmail() {
        return email.get();
    }
    
    public void setEmail(String fName) {
        email.set(fName);
    }
    
    	public StringProperty emailProperty() {
		return email;
	}
}