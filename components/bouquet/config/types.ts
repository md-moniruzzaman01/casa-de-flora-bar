export interface HeroContent {
    id: string;
    type: string;
    title: string;
    description: string;
    buttonText: string;
    link: string;
    image: string;
}

export interface QuoteContent {
    id: string;
    type: string;
    text: string;
    secondaryText: string;
}

export interface HowItWorksStep {
    number: string;
    title: string;
    description: string;
    icon: string;
}

export interface HowItWorksContent {
    id: string;
    type: string;
    heading: string;
    subheading: string;
    steps: HowItWorksStep[];
}

export interface ExperienceRow {
    label: string;
    value: string;
}

export interface DetailsContent {
    id: string;
    type: string;
    experienceDetails: {
        title: string;
        rows: ExperienceRow[];
    };
    perfectFor: {
        title: string;
        list: string[];
    };
}

export interface NoticeContent {
    id: string;
    type: string;
    text: string;
    ctaButton: string;
}

export type BouquetBookingFormData = {
    name: string;
    email: string;
    phone: string;
    preferredDate: string;
    timeOptions: string;
    bouquetType: string;
    cardMessage: string;
    numberOfGuests: string;
    specialRequests: string;
    acceptTerms: boolean;
};
