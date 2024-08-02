import { screen, render } from "@testing-library/react";
import SectionHeader from "@/components/SectionHeader/index";

describe("SectionHeader", () => {
	it('Should return "Upcoming Sessions"', () => {
		render(<SectionHeader name="Upcoming Sessions" />);
		const headerName = screen.getByTestId("section_title");
		expect(headerName).toContain("Upcoming Sessions");
	});
});
