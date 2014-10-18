import javafx.beans.property.SimpleStringProperty;
import javafx.beans.property.StringProperty;
 
public class Images {

	private final StringProperty image;
	private final StringProperty description;

	public Images(String firstName, String lastName) {
		this.image = new SimpleStringProperty(firstName);
		this.description = new SimpleStringProperty(lastName);
	}
	
	public String getImage() {
		return image.get();
	}

	public void setImage(String firstName) {
		this.image.set(firstName);
	}
	
	public StringProperty imageProperty() {
		return image;
	}

	public String getDescription() {
		return description.get();
	}

	public void setDescription(String lastName) {
		this.description.set(lastName);
	}
	
	public StringProperty descriptionProperty() {
		return description;
	}
}