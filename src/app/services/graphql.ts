import { Injectable, inject } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {

  private apollo = inject(Apollo);

  // LOGIN
  login(username: string, password: string) {
    return this.apollo.query({
      query: gql`
        query($x:String!,$p:String!) {
          login(usernameOrEmail:$x,password:$p){
            success
            token
          }
        }
      `,
      variables: { x: username, p: password }
    });
  }

  // SIGNUP
  signup(username: string, email: string, password: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation($u:String!,$e:String!,$p:String!) {
          signup(username:$u,email:$e,password:$p){
            success
            message
          }
        }
      `,
      variables: { u: username, e: email, p: password }
    });
  }

  // GET EMPLOYEES
  getEmployees() {
  return this.apollo.query({
    query: gql`
      query {
        getAllEmployees {
          employees {
            _id
            first_name
            last_name
            designation
            department
            employee_photo
          }
        }
      }
    `,
    fetchPolicy: 'network-only' 
  });
}

  // GET EMPLOYEE BY ID
  getEmployeeById(id: string) {
  return this.apollo.query({
    query: gql`
      query($id: ID!) {
        searchEmployeeByEid(eid: $id) {
          employee {
            first_name
            last_name
            email
            designation
            department
            salary
            gender
            employee_photo
          }
        }
      }
    `,
    variables: { id },
    fetchPolicy: 'network-only'
  });
}

  // ADD EMPLOYEEs
  addEmployee(data: any) {
  return this.apollo.mutate({
    mutation: gql`
      mutation(
        $first_name:String!,
        $last_name:String!,
        $email:String,
        $gender:String,
        $designation:String!,
        $salary:Float!,
        $date_of_joining:String!,
        $department:String!
      ) {
        addEmployee(
          first_name:$first_name
          last_name:$last_name
          email:$email
          gender:$gender
          designation:$designation
          salary:$salary
          date_of_joining:$date_of_joining
          department:$department
        ){
          success
        }
      }
    `,
    variables: data
  });
}

  // UPDATE EMPLOYEE
  updateEmployee(id: string, data: any) {
  return this.apollo.mutate({
    mutation: gql`
      mutation($id:ID!,$designation:String,$salary:Float) {
        updateEmployeeByEid(
          eid:$id
          designation:$designation
          salary:$salary
        ){
          success
        }
      }
    `,
    variables: {
      id,
      designation: data.designation,
      salary: data.salary
    }
  });
}

// SEARCH EMPLOYEES
searchEmployees(term: string) {
  return this.apollo.query({
    query: gql`
      query($term: String!) {
        searchEmployeeByDesignationOrDepartment(
          department: $term
        ) {
          employees {
            _id
            first_name
            last_name
            designation
            department
            employee_photo
          }
        }
      }
    `,
    variables: { term },
    fetchPolicy: 'network-only'
  });
}

  // DELETE
  deleteEmployee(id: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation($id:ID!) {
          deleteEmployeeByEid(eid:$id){
            success
          }
        }
      `,
      variables: { id }
    });
  }
}