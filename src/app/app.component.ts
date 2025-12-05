import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoofyQuizComponent } from './goofy-quiz/goofy-quiz.component';
import { CommonModule } from '@angular/common';
import { ToursComponent } from './tours/tours.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, GoofyQuizComponent, ToursComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  quizzes = [
    {
      id: 1,
      question: 'Quel objectif central de la démarche NIRD – Le Village Numérique Résistant dans un établissement scolaire est le plus directement lié à la réduction de la dépendance aux Big Tech ?',
      answers: { 
        A: 'Augmenter la présence des plateformes sociales commerciales dans les cours', 
        B: 'Externaliser l’ensemble des services numériques à un fournisseur unique', 
        C: 'Assurer l’autonomie numérique via des outils libres, hébergements locaux et gouvernance des données', 
        D: 'Renforcer l’attractivité marketing de l’école auprès des entreprises technologiques' 
      },
      validAnswer: 'C'
    },
    {
      id: 2,
      question: 'Dans une feuille de route NIRD pour un collège, quelle action initiale est la plus pertinente pour préparer une transition loin des Big Tech ?',
      answers: { 
        A: 'Déployer immédiatement un cloud public mondial pour tous les élèves', 
        B: 'Réaliser un audit des usages, des flux de données et des dépendances techniques', 
        C: 'Assurer l’autonomie numérique via des outils libres, hébergements locaux et gouvernance des donnéesImposer l’interdiction totale des appareils personnels sans alternatives', 
        D: 'Acheter des licences propriétaires pour verrouiller l’écosystème existant' 
      },
      validAnswer: 'B'
    },
    {
      id: 3,
      question: 'Quel indicateur de réussite reflète le mieux la progression vers une souveraineté numérique à la NIRD ?',
      answers: { 
        A: 'La part du budget allouée aux réseaux sociaux commerciaux', 
        B: 'Le volume de données transférées vers des data centers extra-UE', 
        C: 'Le nombre de publicités vues par élève sur les plateformes utilisées', 
        D: 'Le taux de services clés migrés vers des solutions libres interopérables et auto-hébergeables' 
      },
      validAnswer: 'D'
    },
    {
      id: 4,
      question: 'Quelle combinaison d’actions pédagogiques incarne le mieux l’esprit du Village Numérique Résistant en classe ?',
      answers: { 
        A: 'Remplacer tous les manuels par une plateforme propriétaire fermée', 
        B: 'Utiliser un réseau social propriétaire pour tous les devoirs et communications', 
        C: 'Organiser des cours d’éducation aux médias en s’appuyant sur des outils libres et des formats ouverts', 
        D: 'Encourager les comptes personnels des élèves sur les services Big Tech pour ‘faciliter’ l’accès' 
      },
      validAnswer: 'C'
    },
    {
      id: 5,
      question: 'Sur le plan technique, quelle architecture soutient le mieux la résilience prônée par la démarche NIRD dans un établissement ?',
      answers: { 
        A: 'Un unique fournisseur cloud propriétaire pour tous les services', 
        B: 'Un parc hétérogène sans politique de sécurité ni mises à jour planifiées', 
        C: 'Des applications mobiles propriétaires sans interopérabilité et mises à jour imposées', 
        D: 'Une architecture modulaire avec services libres auto-hébergeables, sauvegardes et fédération possible' 
      },
      validAnswer: 'D'
    },
  ];

  getQuizById(id: number) {
    return this.quizzes.find(q => q.id === id);
  }
  isPopupVisible = false;

  openTours() {
    this.isPopupVisible = true;
  }

  closeTours() {
    this.isPopupVisible = false;
  }
}
