import javafx.beans.property.SimpleStringProperty;
 
public class Person {
   private final SimpleStringProperty firstName = new SimpleStringProperty("");

public Person() {
        this("");
    }
 
    public Person(String firstName) {
        setFirstName(firstName);

    }

    public String getFirstName() {
        return firstName.get();
    }
 
    public void setFirstName(String fName) {
        firstName.set(fName);
    }
 
}