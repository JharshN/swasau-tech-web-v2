import MainGraphic from "@/components/home/MainGraphic";
import ServiceListing from "@/components/home/ServiceListing";
import ProjectsSection from "@/components/home/ProjectsSection";
import Testimonials from "@/components/home/Testimonials";
import TeamSection from "../components/home/TeamSection";
import UseAPI from "@/hooks/UseAPI";
import AboutUs from "@/components/home/AboutUs";
import Founders from "@/components/home/Founders";

export const runtime = "edge";
export default async function Home() {
  const query = `query {
    clients: clientsCollection {
      items {
        companyName
        description
        siteLink
        order
      }
    }
    
    projects: projectsCollection {
      items {
        title
        description
      }
    }
    
    services: servicesCollection {
      items {
        sys {
          id
        }
        title
        image {
          url
        }
        order
      }
    }
    
    team: teamCollection {
      items {
        name
        designation
        displayPicture {
          url
        }
        github
        linkedin
        sys {
          id
        }
      }
    }
  }`
  const response = async () => { const res = await UseAPI(query); return res.data }
  const query_response = await response()
  if(query_response){
    query_response.services.items.sort((a, b) => a.order - b.order);
    query_response.clients.items.sort((a, b) => a.order - b.order);    
    var projects = query_response.projects
    var clients = query_response.clients
    var team = query_response.team
    var services = query_response.services    
  }
  return (
    <>
        <MainGraphic/>      
        {services && <ServiceListing services={services.items}/>} 
        {projects  && <ProjectsSection projects={projects.items}/>}
        {clients && <Testimonials clients={clients.items}/>}
        <Founders/>
        {team && <TeamSection team={team.items}/>}
        <AboutUs/>
    </>
  );
}
