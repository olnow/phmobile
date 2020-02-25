package olnow.phmobile;

import java.util.ArrayList;

public class PeopleServices {
    private PeopleDAO people = new PeopleDAO();

    public void addPeople(People people) { this.people.addPeople(people); }
    public void updatePeople(People people) { this.people.updatePeople(people); }
    public People findPeople(String fio) { return this.people.findPeople(fio); }
    public People findPeopleById(int id) { return this.people.findPeople(id); }
    public ArrayList<People> getPeople() { return this.people.getPeople(); }
    public void setPeopleFilter(String filter) {
        this.people.setPeopleFilter(filter);
    }
    public void clearPeopleFilter() { this.people.clearPeopleFilter(); }
    public ArrayList<String> getDepartments() { return this.people.getDepartments(); }
    public ArrayList<String> getPositions() { return this.people.getPositions(); }
}
